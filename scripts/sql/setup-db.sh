#!/usr/bin/env bash
# ============================================================
# setup-db.sh — create DB user, database, apply schema, update .env
# Usage: bash scripts/sql/setup-db.sh
# ============================================================

export PATH="/c/PROGRA~1/PostgreSQL/18/bin:$PATH"

# ── Check psql is available ───────────────────────────────────
if ! command -v psql &>/dev/null; then
  echo "✗ psql not found. Add PostgreSQL bin to PATH and retry."
  exit 1
fi
echo "✓ $(psql --version)"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
SCHEMA_FILE="$ROOT_DIR/design/sql/schema.sql"
ENV_FILE="$ROOT_DIR/.env"

# ── Prompts ──────────────────────────────────────────────────
read -rp "Postgres superuser password (for 'postgres'): " -s PG_SUPER_PASS; echo
read -rp "New DB user to create [leave_user]:            " DB_USER
DB_USER="${DB_USER:-leave_user}"
read -rp "Password for '$DB_USER':                       " -s DB_PASS; echo
read -rp "Database name to create [leave_management]:    " DB_NAME
DB_NAME="${DB_NAME:-leave_management}"

export PGPASSWORD="$PG_SUPER_PASS"

echo ""
echo "→ Creating user '$DB_USER'..."
psql -h localhost -U postgres -c \
  "DO \$\$ BEGIN
     IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_USER') THEN
       CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASS';
     ELSE
       ALTER ROLE $DB_USER WITH PASSWORD '$DB_PASS';
     END IF;
   END \$\$;" \
  || { echo "✗ Failed to create user"; exit 1; }

echo "→ Creating database '$DB_NAME'..."
psql -h localhost -U postgres -c \
  "SELECT 'already exists' FROM pg_database WHERE datname = '$DB_NAME'" \
  | grep -q "already exists" \
  || psql -h localhost -U postgres -c \
       "CREATE DATABASE $DB_NAME OWNER $DB_USER;" \
  || { echo "✗ Failed to create database"; exit 1; }

echo "→ Granting privileges..."
psql -h localhost -U postgres -d "$DB_NAME" -c \
  "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
   GRANT ALL ON SCHEMA public TO $DB_USER;" \
  || { echo "✗ Failed to grant privileges"; exit 1; }

echo "→ Applying schema..."
export PGPASSWORD="$DB_PASS"
psql -h localhost -U "$DB_USER" -d "$DB_NAME" -f "$SCHEMA_FILE" \
  || { echo "✗ Failed to apply schema"; exit 1; }

echo "→ Updating .env..."
update_env() {
  local key="$1" val="$2"
  if grep -q "^${key}=" "$ENV_FILE" 2>/dev/null; then
    sed -i "s|^${key}=.*|${key}=${val}|" "$ENV_FILE"
  else
    echo "${key}=${val}" >> "$ENV_FILE"
  fi
}

update_env "DB_HOST"     "localhost"
update_env "DB_PORT"     "5432"
update_env "DB_USER"     "$DB_USER"
update_env "DB_PASSWORD" "$DB_PASS"
update_env "DB_NAME"     "$DB_NAME"

echo ""
echo "✓ Done. .env updated:"
grep "^DB_" "$ENV_FILE"

echo ""
echo "→ Testing connection..."
psql -h localhost -U "$DB_USER" -d "$DB_NAME" -c "\dt" \
  && echo "✓ Connection successful — tables listed above." \
  || echo "✗ Connection test failed."

unset PGPASSWORD
