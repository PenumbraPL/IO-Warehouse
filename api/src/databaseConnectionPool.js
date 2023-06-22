import Ajv from 'ajv';
import pg from 'pg';

const ajv = new Ajv();

class DatabaseConnectionPool {
    #client;

    static #validateRack = ajv.compile({
        type: "object",
        properties: {
            height: { type: "integer" },
            occupiedHeight: { type: "integer" },
            sectorId: { type: "integer" },
        },
        required: ["height", "occupiedHeight", "sectorId"],
        additionalProperties: false,
    });

    constructor() {
        // gets connection info from environment variables
        // (https://www.postgresql.org/docs/current/libpq-envars.html)
        // TODO: use a config file instead
        this.#client = new pg.Pool({max: 5});
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

    async addRack(rack) {
        if (!DatabaseConnectionPool.#validateRack(rack)) {
            return false;
        }

        await this.#client.query(
            'INSERT INTO Racks (Height, OccupiedHeight, SectorID) VALUES ($1, $2, $3);',
            [rack.height, rack.occupiedHeight, rack.sectorId]
        );
        return true;
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
