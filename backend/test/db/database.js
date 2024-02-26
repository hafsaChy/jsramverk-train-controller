/**
 * Test the database
 */

import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { MongoMemoryServer } from 'mongodb-memory-server';
import database from '../../db/database.js';

describe('Database Functions', () => {
    let mongoServer;

    before(async () => {
        // Start an in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        // Set environment variables
        process.env.ATLAS_USERNAME = process.env.ATLAS_USERNAME;
        process.env.ATLAS_PASSWORD = process.env.ATLAS_PASSWORD;
        process.env.NODE_ENV = 'test';
    });

    after(async () => {
        // Stop the in-memory MongoDB server
        await mongoServer.stop();
    });

    describe('openDb', () => {
        it('should open a database connection', async () => {
            const db = await database.openDb();
            expect(db).to.exist;
            expect(db.databaseName).to.equal('test');
            await db.client.close();
        });

        it('should handle errors during connection', async () => {
            // Mocking the MongoClient to throw an error
            sinon.stub(database, 'openDb').throws(new Error('Connection error'));

            try {
                await database.openDb();
            } catch (error) {
                expect(error).to.be.an.instanceOf(Error);
                expect(error.message).to.equal('Connection error');
            } finally {
                sinon.restore();
            }
        });
    });
});
