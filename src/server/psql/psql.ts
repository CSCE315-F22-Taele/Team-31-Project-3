import { Pool } from 'pg';

function init() {

	const props: any = {
		user: process.env.POSTGRES_USER,
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DBNAME,
		password: process.env.POSTGRES_PASSWORD,
		port: Number(process.env.POSTGRES_PORT),
	};

	if (!Boolean(process.env.DEV_DB))
		props.ssl = { rejectUnauthorized: false }

	return new Pool(props);
}


const psql = init();
export type DB = Pool;
export default psql;
