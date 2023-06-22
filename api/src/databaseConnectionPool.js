import Ajv from 'ajv';
import assert from 'assert';
import pg from 'pg';

const ajv = new Ajv();

class DatabaseConnectionPool {
    #client;

    constructor() {
        // gets connection info from environment variables
        // (https://www.postgresql.org/docs/current/libpq-envars.html)
        // TODO: use a config file instead
        this.#client = new pg.Pool({ max: 5 });
    }

    static #validateRack = ajv.compile({
        type: 'object',
        properties: {
            capacity: { type: 'integer' },
            occupied: { type: 'integer' },
            sectorId: { type: 'integer' },
        },
        required: ['capacity', 'occupied', 'sectorId'],
        additionalProperties: false,
    });

    async getRacks() {
        const racks = (await this.#client.query(`
            SELECT
                Capacity AS "capacity",
                Occupied AS "occupied",
                SectorID AS "sectorId"
            FROM Racks
        `)).rows;
        assert(racks.every(r => DatabaseConnectionPool.#validateRack(r)));

        return racks;
    }

    async getRackById(id) {
        const result = await this.#client.query(`
            SELECT
                Capacity AS "capacity",
                Occupied AS "occupied",
                SectorID AS "sectorId"
            FROM Racks
            WHERE ID = $1
        `, [id]);
        if (result.rowCount == 0) {
            return null;
        }

        const rack = result.rows[0];
        assert(DatabaseConnectionPool.#validateRack(rack));
        return rack;
    }

    async addRack(rack) {
        if (!DatabaseConnectionPool.#validateRack(rack)) {
            return false;
        }

        return await this.#client.query(
            'INSERT INTO Racks (Capacity, Occupied, SectorID) VALUES ($1, $2, $3);',
            [rack.capacity, rack.occupied, rack.sectorId]
        ).then(() => true, () => false);
    }

    async removeRack(id) {
        const result = await this.#client.query('DELETE FROM Racks WHERE ID = $1', [id]);
        return result.rowCount != 0;
    }

    async getSectors() {
        const sectors = (await this.#client.query('SELECT ID FROM Sectors')).rows;
        return {
            sectors: await Promise.all(sectors.map(async (sector) => {
                return {
                    ID: sector.id,
                    Racks: (await this.#client.query('SELECT ID FROM Racks WHERE SectorID = $1', [sector.id])).rows.map((rack) => rack.id)
                };
            }, this))
        };
    }

    static #validateSector = ajv.compile({
        type: "object",
        properties: {
            name: { type: "string" }
        },
        additionalProperties: false,
    })

    async addSector(sector) {
        if (!DatabaseConnectionPool.#validateSector(sector)) {
            return null;
        }

        return {
            sector: (await this.#client.query('INSERT INTO Sectors (Name) VALUES ($1) RETURNING ID', [sector.name])).rows[0]
        }
    }

    async removeSector(id) {
        const result = await this.#client.query('DELETE FROM Sectors WHERE ID = $1', [id]);
        return result.rowCount != 0;
    }

    async getSectorById(id) {
        const doesSectorExist = (await this.#client.query('SELECT ID FROM Sectors WHERE ID = $1', [id])).rowCount == 1
        if (!doesSectorExist) {
            return null;
        }

        const sector = (await this.#client.query('SELECT ID As "ID", 5 AS "Capacity" FROM Racks WHERE "sectorID" = $1', [id])).rows;
        return result = {
            sector: await Promise.all(sector.map(async (rack) => {
                rack.slots = (await this.#client.query('SELECT * FROM Slots')).rows;
                return rack;
            }), this)
        }
    }
}

export default DatabaseConnectionPool;
