import { Pool } from 'pg';

const psql = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DBNAME,
	password: process.env.POSTGRES_PASSWORD,
	port: Number(process.env.POSTGRES_PORT),
	ssl: { rejectUnauthorized: false }
});

export type DB = Pool;
export default psql;
