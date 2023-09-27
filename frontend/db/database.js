// const sqlite3 = require('sqlite3').verbose();
// const { open } = require('sqlite');

// const database = {
//     openDb: async function openDb() {
//         let dbFilename = `./db/trains.sqlite`;

//         if (process.env.NODE_ENV === 'test') {
//             dbFilename = "./db/test.sqlite";
//         }

//         return await open({
//             filename: dbFilename,
//             driver: sqlite3.Database
//         });
//     }
// };

// module.exports = database;

const mongo = require("mongodb").MongoClient;
const collectionName = "keys";

const database = {
    getDb: async function getDb() {
        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.v8m4hqa.mongodb.net/?retryWrites=true&w=majority`;
        
        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
