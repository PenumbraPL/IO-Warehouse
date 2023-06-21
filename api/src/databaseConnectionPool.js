const pg = require('pg');

class DatabaseConnectionPool {
    #client;

    constructor() {
        // gets connection info from environment variables
        // (https://www.postgresql.org/docs/current/libpq-envars.html)
        // TODO: use a config file instead
        this.#client = new pg.Pool();
    }

    async connect() {
        await this.#client.connect();
    }

    async getRacks() {
        return (await this.#client.query('SELECT * FROM Racks')).rows;
    }

    async getRack(id) {
        const result = await this.#client.query('SELECT * FROM Racks WHERE ID = $1', [id]);
        if (result.rowCount == 0) {
            return null;
        } else {
            return result.rows[0];
        }
    }
}

module.exports = DatabaseConnectionPool;
