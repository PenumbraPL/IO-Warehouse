import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import pg from 'pg';

async function executeFromFile(fileType) {
    const client = new pg.Client();
    client.connect()

    const fileStream = createReadStream(`database/${fileType}.sql`);

    const rl = createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let query = '';

    client.on('', (err) => console.error(err));

    for await (const line of rl) {
        query += ` ${line}`;
        if (line.includes(';')) {
            try {
                await client.query(query);
            } catch (err) {
                console.error(err);
            }
            query = '';
        }
    }

    client.end();
}

executeFromFile('dml');

export default executeFromFile;
