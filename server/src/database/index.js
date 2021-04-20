const logger = require('pino')();

const Database = require('./database');
// const { DB_URL } = require('../environment');
import { pg_user, pg_host, pg_db, pg_password, pg_port } from '../settings';

const db = new Database(DB_URL, logger);

module.exports = db;
