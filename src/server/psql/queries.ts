import {Employee, } from '../types/bo';
import { DB } from './psql';

export const selectEmployees = async  (db: DB) : Promise<Employee[]> => {
	const rs = await db.query('SELECT * from EMPLOYEES;')
	return rs.rows as Employee[];
}
