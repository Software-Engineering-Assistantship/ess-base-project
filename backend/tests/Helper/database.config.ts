import { DatabaseConnection } from './DatabaseConnection';
import 'dotenv/config';

const connection = new DatabaseConnection();

export { connection };
