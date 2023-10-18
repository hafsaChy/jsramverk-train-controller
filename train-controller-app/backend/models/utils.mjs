// const database = require('../db/database.mjs');
import database from '../db/database.mjs';

const trains = {
    getTrains: async function getTrains(limit = -1) {
        const queryLimit = limit === -1 ? '' : `limit="${limit}"`;
        const query = `<REQUEST>
        <LOGIN authenticationkey="${process.env.REACT_APP_TRV_APIKEY}" />
        <QUERY
            sseurl="true"
            namespace="järnväg.trafikinfo"
            objecttype="TrainPosition"
            schemaversion="1.0"
            ${queryLimit}            
        />
        </REQUEST>`;

        const response = await fetch(
            "https://api.trafikinfo.trafikverket.se/v2/data.json", {
                method: "POST",
                body: query,
                headers: { "Content-Type": "text/xml" }
            }
        );
        const result = await response.json();

        return result.RESPONSE.RESULT[0];
    },

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
