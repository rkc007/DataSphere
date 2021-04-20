const pg = require('pg');

module.exports = class Database {
  constructor(connectionString, logger) {
    this.pool = new pg.Pool({
      connectionString,
    });
    this.logger = logger;
  }

  async runSelectQuery(queryhere, params = []) {
    let response = [];
    console.log('try connecting to pool');
    const client = new pg.Client({
      user : '',
      host:'',
      database:'',
      password:'',
      port: 5432
    });
    client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})
    try {
      const { rows } = await client.query(queryhere, params);
      response = rows;
    } catch (error) {
      console.log(error);
      this.logger.error(error);
      this.notifyOnError(query, params, error);
    } finally {
      // clientn.release();
    }

    return response;
  }

  // Safely run a database insert/update/delete query
  async runExecuteQuery(query, params = []) {
    let response = 0;
    const client = await this.pool.connect();
    try {
      const { rowCount } = await client.query(query, params);
      response = rowCount;
    } catch (error) {
      this.logger.error(error);
      this.notifyOnError(query, params, error);
    } finally {
      client.release();
    }

    return response;
  }
};
