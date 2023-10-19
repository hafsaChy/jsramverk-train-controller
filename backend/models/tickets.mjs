// const database = require('../db/database.mjs');
import database from '../db/database.mjs';

const tickets = {
    getTickets: async function getTickets(req, res){
        var db = await database.openDb();

        var allTickets = await db.all(`SELECT *, ROWID as id FROM tickets ORDER BY ROWID DESC`);

        await db.close();

        return res.json({
            data: allTickets
        });
    },

    createTicket: async function createTicket(req, res){
        var db = await database.openDb();

        const result = await db.run(
            'INSERT INTO tickets (code, trainnumber, traindate) VALUES (?, ?, ?)',
            req.body.code,
            req.body.trainnumber,
            req.body.traindate,
        );

        await db.close();

        return res.json({
            data: {
                id: result.lastID,
                code: req.body.code,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate,
            }
        });
    }
};

// module.exports = tickets;
export default tickets;
