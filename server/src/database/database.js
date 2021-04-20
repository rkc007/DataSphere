const pg = require('pg');
import { pg_user, pg_host, pg_db, pg_password, pg_port } from '../settings';

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

const pg = require('pg');

module.exports = class Database {
  constructor(logger) {
    // this.pool = new pg.Pool({
    //   connectionString,
    // });
    this.logger = logger;
  }

  async runSelectQuery(queryhere, params = []) {
    let response = [];
    console.log('try connecting to pool');
    const client = new pg.Client({
      user: pg_user,
      host: pg_host,
      database: pg_db,
      password: pg_password,
      port: pg_port,
    });
    client.connect((err) => {
      if (err) {
        console.error('connection error', err.stack);
      } else {
        console.log('connected');
      }
    });
    try {
      const { rows } = await client.query(queryhere, params);
      response = rows;
    } catch (error) {
      console.log(error);
      this.logger.error(error);
      this.notifyOnError(query, params, error);
    } finally {
      client.release();
    }

    return response;
  }

  // Safely run a database insert/update/delete query
  // async runExecuteQuery(query, params = []) {
  //   let response = 0;
  //   const client = await this.pool.connect();
  //   try {
  //     const { rowCount } = await client.query(query, params);
  //     response = rowCount;
  //   } catch (error) {
  //     this.logger.error(error);
  //     this.notifyOnError(query, params, error);
  //   } finally {
  //     client.release();
  //   }

  //   return response;
  // }
};
