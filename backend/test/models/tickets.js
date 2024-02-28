/**
 * Test models
 */

import { describe, it, before, after } from 'mocha';
import chai from 'chai';
import sinon from 'sinon';
import { MongoMemoryServer } from 'mongodb-memory-server';
import database from '../../db/database.js';
import tickets from '../../models/tickets.js';

const { expect, should } = chai;

// Enable 'should' style
should();
// test database functions
describe('Test model', () => {
    let mongoServer;
    const colName = 'tickets';

    before(async () => {
        // Start an in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        // Set environment variables
        process.env.ATLAS_USERNAME = process.env.ATLAS_USERNAME;
        process.env.ATLAS_PASSWORD = process.env.ATLAS_PASSWORD;
        process.env.NODE_ENV = 'test';
        const db = await database.openDb();

        try {
            const col = await db.collection(colName);

            await col.deleteMany();
        } catch (err) {
            console.log("Error:", err);
        } finally {
            await db.client.close();
        }

    });

    after(async () => {
        // Stop the in-memory MongoDB server
        await mongoServer.stop();
    });

    describe('tickets', () => {
        let ticketId = null;
        // Get tickets, should be empty
        it('should return empty array', async () => {
            const res = await tickets.getTickets();

            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });

        it('should data and array with 1 ticket', async () => {
            const inData = {
                code: "aBcd123",
                trainnumber: "12345",
                traindate: "2023-09-01"
            };
            const res = await tickets.createTicket(inData);

            res.should.be.a('object');
            res.should.have.property('_id');
            res.code.should.equal('aBcd123');
            ticketId = res._id;
        });

        it('should return array with one item', async () => {
            const res = await tickets.getTickets();

            res.should.be.a('array');
            res.should.have.lengthOf(1);
            res[0].should.have.property('_id');
            res[0].trainnumber.should.equal('12345');
            res[0].traindate.should.equal('2023-09-01');

        });

        it('should throw TypeError', async () => {
            let error;

            try {
                await tickets.createTicket();
            } catch (e) {
                error = e;
            }

            error.should.be.an.instanceOf(TypeError);
        });

        it('should change code on ticket', async () => {
            const args = {
                _id: ticketId,
                code: "aBcd123updated"
            }
            
            let res = await tickets.updateTicket(args)

            res.should.be.a('object');
            res.should.have.property('_id');
            res.code.should.equal('aBcd123updated');

            res = await tickets.getTickets();
            res[0].code.should.equal('aBcd123updated');
        });

        it('delete should empty collection', async () => {
            const args = {
                _id: ticketId,
            }
            
            let res = await tickets.deleteTicket(args)

            res.should.be.a('object');
            res.should.have.property('_id');
            res._id.should.equal(ticketId);

            res = await tickets.getTickets();
            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });
    });
});
