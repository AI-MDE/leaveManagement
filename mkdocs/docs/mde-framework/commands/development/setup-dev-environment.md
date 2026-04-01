# Setup Dev Environment

| | |
|---|---|
| **Name** | `setup_dev_environment` |
| **Phase** | development |
| **Intent** | generate |
| **Calls** |  |

## Rules

- Overwrite package.json — derive name from config.project.name, version from config.project.version; set name to kebab-case
- Include scripts: build (tsc), start (node dist&#x2F;index.js), test (jest), test:unit (jest --testPathPattern&#x3D;test&#x2F;unit), test:integration (jest --testPathPattern&#x3D;test&#x2F;integration), dev (ts-node src&#x2F;index.ts), seed (node scripts&#x2F;loadSeedData.js)
- Include dependencies: mysql2, uuid; include devDependencies: typescript, ts-jest, @types&#x2F;jest, @types&#x2F;node, jest, @types&#x2F;mysql2
- Jest config: preset&#x3D;ts-jest, testEnvironment&#x3D;node, testMatch&#x3D;[**&#x2F;*.test.ts], collectCoverage&#x3D;false
- Overwrite tsconfig.json — target ES2020, module commonjs, strict true, esModuleInterop true, skipLibCheck true, outDir&#x3D;dist, rootDir&#x3D;src; include src&#x2F;**&#x2F;*.ts and test&#x2F;**&#x2F;*.ts; exclude node_modules, dist
- Generate .env only if it does not already exist — include: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME with placeholder values; include PORT&#x3D;3000
- Add .env to .gitignore if .gitignore exists
## Rules

- Overwrite package.json — derive name from config.project.name, version from config.project.version; set name to kebab-case
- Include scripts: build (tsc), start (node dist&#x2F;index.js), test (jest), test:unit (jest --testPathPattern&#x3D;test&#x2F;unit), test:integration (jest --testPathPattern&#x3D;test&#x2F;integration), dev (ts-node src&#x2F;index.ts), seed (node scripts&#x2F;loadSeedData.js)
- Include dependencies: mysql2, uuid; include devDependencies: typescript, ts-jest, @types&#x2F;jest, @types&#x2F;node, jest, @types&#x2F;mysql2
- Jest config: preset&#x3D;ts-jest, testEnvironment&#x3D;node, testMatch&#x3D;[**&#x2F;*.test.ts], collectCoverage&#x3D;false
- Overwrite tsconfig.json — target ES2020, module commonjs, strict true, esModuleInterop true, skipLibCheck true, outDir&#x3D;dist, rootDir&#x3D;src; include src&#x2F;**&#x2F;*.ts and test&#x2F;**&#x2F;*.ts; exclude node_modules, dist
- Generate .env only if it does not already exist — include: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME with placeholder values; include PORT&#x3D;3000
- Add .env to .gitignore if .gitignore exists
## Rules

- Overwrite package.json — derive name from config.project.name, version from config.project.version; set name to kebab-case
- Include scripts: build (tsc), start (node dist&#x2F;index.js), test (jest), test:unit (jest --testPathPattern&#x3D;test&#x2F;unit), test:integration (jest --testPathPattern&#x3D;test&#x2F;integration), dev (ts-node src&#x2F;index.ts), seed (node scripts&#x2F;loadSeedData.js)
- Include dependencies: mysql2, uuid; include devDependencies: typescript, ts-jest, @types&#x2F;jest, @types&#x2F;node, jest, @types&#x2F;mysql2
- Jest config: preset&#x3D;ts-jest, testEnvironment&#x3D;node, testMatch&#x3D;[**&#x2F;*.test.ts], collectCoverage&#x3D;false
- Overwrite tsconfig.json — target ES2020, module commonjs, strict true, esModuleInterop true, skipLibCheck true, outDir&#x3D;dist, rootDir&#x3D;src; include src&#x2F;**&#x2F;*.ts and test&#x2F;**&#x2F;*.ts; exclude node_modules, dist
- Generate .env only if it does not already exist — include: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME with placeholder values; include PORT&#x3D;3000
- Add .env to .gitignore if .gitignore exists
## Rules

- Overwrite package.json — derive name from config.project.name, version from config.project.version; set name to kebab-case
- Include scripts: build (tsc), start (node dist&#x2F;index.js), test (jest), test:unit (jest --testPathPattern&#x3D;test&#x2F;unit), test:integration (jest --testPathPattern&#x3D;test&#x2F;integration), dev (ts-node src&#x2F;index.ts), seed (node scripts&#x2F;loadSeedData.js)
- Include dependencies: mysql2, uuid; include devDependencies: typescript, ts-jest, @types&#x2F;jest, @types&#x2F;node, jest, @types&#x2F;mysql2
- Jest config: preset&#x3D;ts-jest, testEnvironment&#x3D;node, testMatch&#x3D;[**&#x2F;*.test.ts], collectCoverage&#x3D;false
- Overwrite tsconfig.json — target ES2020, module commonjs, strict true, esModuleInterop true, skipLibCheck true, outDir&#x3D;dist, rootDir&#x3D;src; include src&#x2F;**&#x2F;*.ts and test&#x2F;**&#x2F;*.ts; exclude node_modules, dist
- Generate .env only if it does not already exist — include: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME with placeholder values; include PORT&#x3D;3000
- Add .env to .gitignore if .gitignore exists
## Rules

- Overwrite package.json — derive name from config.project.name, version from config.project.version; set name to kebab-case
- Include scripts: build (tsc), start (node dist&#x2F;index.js), test (jest), test:unit (jest --testPathPattern&#x3D;test&#x2F;unit), test:integration (jest --testPathPattern&#x3D;test&#x2F;integration), dev (ts-node src&#x2F;index.ts), seed (node scripts&#x2F;loadSeedData.js)
- Include dependencies: mysql2, uuid; include devDependencies: typescript, ts-jest, @types&#x2F;jest, @types&#x2F;node, jest, @types&#x2F;mysql2
- Jest config: preset&#x3D;ts-jest, testEnvironment&#x3D;node, testMatch&#x3D;[**&#x2F;*.test.ts], collectCoverage&#x3D;false
- Overwrite tsconfig.json — target ES2020, module commonjs, strict true, esModuleInterop true, skipLibCheck true, outDir&#x3D;dist, rootDir&#x3D;src; include src&#x2F;**&#x2F;*.ts and test&#x2F;**&#x2F;*.ts; exclude node_modules, dist
- Generate .env only if it does not already exist — include: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME with placeholder values; include PORT&#x3D;3000
- Add .env to .gitignore if .gitignore exists
## Rules

- Overwrite package.json — derive name from config.project.name, version from config.project.version; set name to kebab-case
- Include scripts: build (tsc), start (node dist&#x2F;index.js), test (jest), test:unit (jest --testPathPattern&#x3D;test&#x2F;unit), test:integration (jest --testPathPattern&#x3D;test&#x2F;integration), dev (ts-node src&#x2F;index.ts), seed (node scripts&#x2F;loadSeedData.js)
- Include dependencies: mysql2, uuid; include devDependencies: typescript, ts-jest, @types&#x2F;jest, @types&#x2F;node, jest, @types&#x2F;mysql2
- Jest config: preset&#x3D;ts-jest, testEnvironment&#x3D;node, testMatch&#x3D;[**&#x2F;*.test.ts], collectCoverage&#x3D;false
- Overwrite tsconfig.json — target ES2020, module commonjs, strict true, esModuleInterop true, skipLibCheck true, outDir&#x3D;dist, rootDir&#x3D;src; include src&#x2F;**&#x2F;*.ts and test&#x2F;**&#x2F;*.ts; exclude node_modules, dist
- Generate .env only if it does not already exist — include: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME with placeholder values; include PORT&#x3D;3000
- Add .env to .gitignore if .gitignore exists
## Rules

- Overwrite package.json — derive name from config.project.name, version from config.project.version; set name to kebab-case
- Include scripts: build (tsc), start (node dist&#x2F;index.js), test (jest), test:unit (jest --testPathPattern&#x3D;test&#x2F;unit), test:integration (jest --testPathPattern&#x3D;test&#x2F;integration), dev (ts-node src&#x2F;index.ts), seed (node scripts&#x2F;loadSeedData.js)
- Include dependencies: mysql2, uuid; include devDependencies: typescript, ts-jest, @types&#x2F;jest, @types&#x2F;node, jest, @types&#x2F;mysql2
- Jest config: preset&#x3D;ts-jest, testEnvironment&#x3D;node, testMatch&#x3D;[**&#x2F;*.test.ts], collectCoverage&#x3D;false
- Overwrite tsconfig.json — target ES2020, module commonjs, strict true, esModuleInterop true, skipLibCheck true, outDir&#x3D;dist, rootDir&#x3D;src; include src&#x2F;**&#x2F;*.ts and test&#x2F;**&#x2F;*.ts; exclude node_modules, dist
- Generate .env only if it does not already exist — include: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME with placeholder values; include PORT&#x3D;3000
- Add .env to .gitignore if .gitignore exists

## Requires

- **config** — `configuration.json`
- **architecture** — `config.mde.architecture`
## Requires

- **config** — `configuration.json`
- **architecture** — `config.mde.architecture`

## Produces

- **packageJson** — `package.json`
- **tsconfig** — `tsconfig.json`
- **env** — `.env`
## Produces

- **packageJson** — `package.json`
- **tsconfig** — `tsconfig.json`
- **env** — `.env`
## Produces

- **packageJson** — `package.json`
- **tsconfig** — `tsconfig.json`
- **env** — `.env`
