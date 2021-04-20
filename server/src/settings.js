import dotenv from 'dotenv';
dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const pg_user = process.env.PG_USER;
export const pg_host = process.env.PG_HOST;
export const pg_db = process.env.PG_DB;
export const pg_password = process.env.PG_PSSWD;
export const pg_port = process.env.PG_PORT;
