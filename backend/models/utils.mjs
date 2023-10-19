// const database = require('../db/database.mjs');
import database from '../db/database.mjs';

const trains = {
    fetchAllDelayedTrains: async function fetchAllDelayedTrains() {
        let db;

        try {
            db = await database.openDb(version);

        } catch(error) {
            return {
                status: error.status,
                message: error.message,
            };
        } finally {
            await db.close();
        }
    }
};

// module.exports = trains;
export default trains;
