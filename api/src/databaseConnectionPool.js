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
        return await this.#client.query('SELECT * FROM Racks');
    }

    async getRack(id) {
        return await this.#client.query('SELECT * FROM racks WHERE id = $1', [id]);
    }
}

module.exports = DatabaseConnectionPool;
