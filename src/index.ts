import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables
dotenv.config();

// Initialize Express and Database
const app: Express = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================================
// EMPLOYEE ENDPOINTS
// ============================================================

// GET /api/employees/current - Get current authenticated user
app.get('/api/employees/current', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, name, email, manager_id, role, created_at, updated_at FROM employees WHERE role = $1 LIMIT 1',
        ['HR_ADMIN']
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(result.rows[0]);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching current employee:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/employees - Get all employees
app.get('/api/employees', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, name, email, manager_id, role, created_at, updated_at FROM employees ORDER BY name'
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/employees/:id - Get employee by ID
app.get('/api/employees/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, name, email, manager_id, role, created_at, updated_at FROM employees WHERE id = $1',
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(result.rows[0]);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/employees/:id/direct-reports - Get direct reports
app.get('/api/employees/:id/direct-reports', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, name, email, manager_id, role, created_at, updated_at FROM employees WHERE manager_id = $1 ORDER BY name',
        [id]
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching direct reports:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// ============================================================
// LEAVE TYPE ENDPOINTS
// ============================================================

// GET /api/leave-types - Get all leave types
app.get('/api/leave-types', async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const client = await pool.connect();
    try {
      let query = 'SELECT id, code, name, advance_notice_days, requires_balance, is_active, created_at, updated_at FROM leave_types';
      const params: any[] = [];

      if (isActive === 'true') {
        query += ' WHERE is_active = true';
      }

      query += ' ORDER BY name';

      const result = await client.query(query, params);
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching leave types:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/leave-types/:id - Get leave type by ID
app.get('/api/leave-types/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, code, name, advance_notice_days, requires_balance, is_active, created_at, updated_at FROM leave_types WHERE id = $1',
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Leave type not found' });
      }
      res.json(result.rows[0]);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching leave type:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// ============================================================
// LEAVE BALANCE ENDPOINTS
// ============================================================

// GET /api/leave-balances/by-employee - Get current user's leave balances
app.get('/api/leave-balances/by-employee', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    try {
      const empResult = await client.query(
        'SELECT id FROM employees WHERE role = $1 LIMIT 1',
        ['EMPLOYEE']
      );

      if (empResult.rows.length === 0) {
        return res.json([]);
      }

      const employeeId = empResult.rows[0].id;
      const result = await client.query(
        `SELECT lb.id, lb.employee_id, lb.leave_type_id, lb.total_days, lb.used_days, 
                lb.pending_days, lb.period_year, lb.updated_at,
                lt.code, lt.name
         FROM leave_balances lb
         JOIN leave_types lt ON lb.leave_type_id = lt.id
         WHERE lb.employee_id = $1
         ORDER BY lb.period_year DESC, lt.name`,
        [employeeId]
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching leave balances:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/leave-balances/summary - Get balance summary
app.get('/api/leave-balances/summary', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    try {
      const empResult = await client.query(
        'SELECT id FROM employees WHERE role = $1 LIMIT 1',
        ['EMPLOYEE']
      );

      if (empResult.rows.length === 0) {
        return res.json([]);
      }

      const employeeId = empResult.rows[0].id;
      const currentYear = new Date().getFullYear();

      const result = await client.query(
        `SELECT lb.id, lb.employee_id, lb.leave_type_id, lb.total_days, lb.used_days, 
                lb.pending_days, lb.period_year, lb.updated_at,
                lt.code, lt.name, lt.requires_balance,
                (lb.total_days - lb.used_days - lb.pending_days) as available_days
         FROM leave_balances lb
         JOIN leave_types lt ON lb.leave_type_id = lt.id
         WHERE lb.employee_id = $1 AND lb.period_year = $2
         ORDER BY lt.name`,
        [employeeId, currentYear]
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching balance summary:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/leave-balances - Get all balances
app.get('/api/leave-balances', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT lb.id, lb.employee_id, lb.leave_type_id, lb.total_days, lb.used_days, 
                lb.pending_days, lb.period_year, lb.updated_at,
                e.name as employee_name, lt.name as leave_type_name
         FROM leave_balances lb
         JOIN employees e ON lb.employee_id = e.id
         JOIN leave_types lt ON lb.leave_type_id = lt.id
         ORDER BY e.name, lb.period_year DESC`
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching all balances:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/employees/:id/balances - Get specific employee's balances
app.get('/api/employees/:id/balances', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT lb.id, lb.employee_id, lb.leave_type_id, lb.total_days, lb.used_days, 
                lb.pending_days, lb.period_year, lb.updated_at,
                lt.code, lt.name
         FROM leave_balances lb
         JOIN leave_types lt ON lb.leave_type_id = lt.id
         WHERE lb.employee_id = $1
         ORDER BY lb.period_year DESC, lt.name`,
        [id]
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching employee balances:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// ============================================================
// LEAVE REQUEST ENDPOINTS
// ============================================================

// GET /api/leave-requests/by-employee - Get current user's leave requests
app.get('/api/leave-requests/by-employee', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    try {
      const empResult = await client.query(
        'SELECT id FROM employees WHERE role = $1 LIMIT 1',
        ['EMPLOYEE']
      );

      if (empResult.rows.length === 0) {
        return res.json([]);
      }

      const employeeId = empResult.rows[0].id;
      const result = await client.query(
        `SELECT lr.id, lr.employee_id, lr.leave_type_id, lr.start_date, lr.end_date, 
                lr.total_days, lr.reason, lr.status, lr.submitted_at, lr.reviewed_at,
                lr.reviewed_by, lr.manager_comment, lr.version, lr.created_at, lr.updated_at,
                lt.name as leave_type_name, e.name as employee_name
         FROM leave_requests lr
         JOIN leave_types lt ON lr.leave_type_id = lt.id
         JOIN employees e ON lr.employee_id = e.id
         WHERE lr.employee_id = $1
         ORDER BY lr.submitted_at DESC`,
        [employeeId]
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/leave-requests/pending-for-manager - Get pending requests for manager
app.get('/api/leave-requests/pending-for-manager', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    try {
      const mgrResult = await client.query(
        'SELECT id FROM employees WHERE role IN ($1, $2) LIMIT 1',
        ['MANAGER', 'HR_ADMIN']
      );

      if (mgrResult.rows.length === 0) {
        return res.json([]);
      }

      const managerId = mgrResult.rows[0].id;

      const result = await client.query(
        `SELECT lr.id, lr.employee_id, lr.leave_type_id, lr.start_date, lr.end_date, 
                lr.total_days, lr.reason, lr.status, lr.submitted_at, lr.reviewed_at,
                lr.reviewed_by, lr.manager_comment, lr.version, lr.created_at, lr.updated_at,
                lt.name as leave_type_name, e.name as employee_name
         FROM leave_requests lr
         JOIN leave_types lt ON lr.leave_type_id = lt.id
         JOIN employees e ON lr.employee_id = e.id
         WHERE e.manager_id = $1 AND lr.status = 'PENDING'
         ORDER BY lr.submitted_at DESC`,
        [managerId]
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/leave-requests/all - Get all leave requests
app.get('/api/leave-requests/all', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT lr.id, lr.employee_id, lr.leave_type_id, lr.start_date, lr.end_date, 
                lr.total_days, lr.reason, lr.status, lr.submitted_at, lr.reviewed_at,
                lr.reviewed_by, lr.manager_comment, lr.version, lr.created_at, lr.updated_at,
                lt.name as leave_type_name, e.name as employee_name
         FROM leave_requests lr
         JOIN leave_types lt ON lr.leave_type_id = lt.id
         JOIN employees e ON lr.employee_id = e.id
         ORDER BY lr.submitted_at DESC`
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching all requests:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/leave-requests/:id - Get leave request by ID
app.get('/api/leave-requests/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT lr.id, lr.employee_id, lr.leave_type_id, lr.start_date, lr.end_date, 
                lr.total_days, lr.reason, lr.status, lr.submitted_at, lr.reviewed_at,
                lr.reviewed_by, lr.manager_comment, lr.version, lr.created_at, lr.updated_at,
                lt.name as leave_type_name, e.name as employee_name
         FROM leave_requests lr
         JOIN leave_types lt ON lr.leave_type_id = lt.id
         JOIN employees e ON lr.employee_id = e.id
         WHERE lr.id = $1`,
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Leave request not found' });
      }
      res.json(result.rows[0]);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching leave request:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// ============================================================
// AUDIT ENDPOINTS
// ============================================================

// GET /api/leave-requests/:id/audit - Get audit trail for leave request
app.get('/api/leave-requests/:id/audit', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT lae.id, lae.leave_request_id, lae.actor_id, lae.action, 
                lae.from_status, lae.to_status, lae.comment, lae.snapshot, lae.occurred_at,
                e.name as actor_name
         FROM leave_audit_entries lae
         JOIN employees e ON lae.actor_id = e.id
         WHERE lae.leave_request_id = $1
         ORDER BY lae.occurred_at DESC`,
        [id]
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching audit trail:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// ============================================================
// HEALTH & STATUS ENDPOINTS
// ============================================================

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/version', (req: Request, res: Response) => {
  res.json({ version: '0.1.0', name: 'Leave Management API' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Leave Management API listening on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
  console.log(`✓ Database: ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});

export default app;
