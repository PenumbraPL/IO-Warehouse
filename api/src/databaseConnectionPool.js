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
        const sectors = (await this.#client.query('SELECT ID AS "ID", Name FROM Sectors')).rows;
        return Promise.all(sectors.map(async (sector) => {
            const rackIDs = (await this.#client.query('SELECT ID AS "ID" FROM Racks WHERE sectorID = $1', [sector.ID]));
            sector.racks = rackIDs.rows.map((rack) => rack.ID)
            return sector;
        }, this))
    }

    static #validateSector = ajv.compile({
        type: 'object',
        properties: {
            name: { type: 'string' }
        },
        additionalProperties: false,
    })

    async addSector(sector) {
        if (!DatabaseConnectionPool.#validateSector(sector)) {
            return null;
        }

        return (await this.#client.query('INSERT INTO Sectors (Name) VALUES ($1) RETURNING ID AS "ID"', [sector.name])).rows[0];
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

        const sector = (await this.#client.query('SELECT ID As "ID", Capacity FROM Racks WHERE sectorID = $1', [id])).rows;
        return Promise.all(sector.map(async (rack) => {
            rack.slots = (await this.#client.query('SELECT * FROM Slots')).rows;
            return rack;
        }), this);
    }

    static #validateMoveSlot = ajv.compile({
        type: 'object',
        properties: {
            sourceRackID: { type: 'integer' },
            sourceSlotPosition: { type: 'integer' },
            destinationRackID: { type: 'integer' },
            destinationSlotPosition: { type: 'integer' }
        },
        required: ['sourceRackID', 'sourceSlotPosition', 'destinationRackID', 'destinationSlotPosition'],
        additionalProperties: false,
    })

    async moveSlot(move) {
        if (!DatabaseConnectionPool.#validateMoveSlot(move)) {
            return null;
        }

        const slotQuery = await this.#client.query(
            'SELECT RackID FROM Slots WHERE RackId = $1 AND Position = $2',
            [move.sourceRackID, move.sourceSlotPosition]);
        if (slotQuery.rowCount != 1) {
            return null;
        }

        const result = await this.#client.query(
            'UPDATE Slots SET RackId = $1, Position = $2 WHERE RackId = $3 AND Position = $4',
            [move.destinationRackID, move.destinationSlotPosition, move.sourceRackID, move.sourceSlotPosition]);
        return result.rowCount == 1;
    }
}

export default DatabaseConnectionPool;
