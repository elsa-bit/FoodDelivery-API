import { } from 'dotenv/config';
import postgresql from 'pg';

const { Pool } = postgresql;
const env = process.env

const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
})

export default { pool }