import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { MongoMemoryServer } from 'mongodb-memory-server';
import database from '../../db/database.js';
import resetCollection from '../../db/setup.js';

describe('Database Functions', () => {
    let mongoServer;

    before(async () => {
        // Start an in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        // Set environment variables
        process.env.ATLAS_USERNAME = process.env.ATLAS_USERNAME;
        process.env.ATLAS_USERNAME = process.env.ATLAS_USERNAME;
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
            expect(db.databaseName).to.equal('test'); // Assuming you are using 'test' as the test database
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
    describe('Test reset function', () => {
        const colName = "testCol";

        // Resets the collection
        it('should return empty array', async () => {
            await resetCollection(colName);

            const res = await database.getCollection(colName) || [];
            console.log(res)

            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });

        // Simulates using an JSON-file as input data
        // it('should return 2 documents', async () => {
        //     // Using an array to simulate documents from a JSON-file.
        //     const doc = [
        //         {
        //             "name": "first document"
        //         },
        //         {
        //             "name": "second document"
        //         }
        //     ];

        //     await resetCollection(colName, doc);

        //     const res = await database.getCollection(colName, doc);

        //     res.should.be.a('array');
        //     res.should.have.lengthOf(2);
        //     res[0].should.have.property("name");
        //     res[1].should.have.property("name");
        // });

        // // Resets the collection again
        // it('should return empty array', async () => {
        //     await resetCollection(colName);

        //     const res = await database.getCollection(colName);

        //     res.should.be.a('array');
        //     res.should.have.lengthOf(0);
        // });
    });
});

    // describe('Test reset function', () => {
    //     const colName = "testCol";

    //     // Resets the collection
    //     it('should return empty array', async () => {
    //         await resetCollection(colName);

    //         const res = await database.getCollection(colName);

    //         res.should.be.a('array');
    //         res.should.have.lengthOf(0);
    //     });

    //     // Simulates using an JSON-file as input data
    //     it('should return 2 documents', async () => {
    //         // Using an array to simulate documents from a JSON-file.
    //         const doc = [
    //             {
    //                 "name": "first document"
    //             },
    //             {
    //                 "name": "second document"
    //             }
    //         ];

    //         await resetCollection(colName, doc);

    //         const res = await database.getCollection(colName, doc);

    //         res.should.be.a('array');
    //         res.should.have.lengthOf(2);
    //         res[0].should.have.property("name");
    //         res[1].should.have.property("name");
    //     });

    //     // Resets the collection again
    //     it('should return empty array', async () => {
    //         await resetCollection(colName);

    //         const res = await database.getCollection(colName);

    //         res.should.be.a('array');
    //         res.should.have.lengthOf(0);
    //     });
    // });

    // describe'getCollection', () => {
    //     it('should get a collection from the database', async () => {
    //         const db = await database.openDb();
    //         const colName = 'testCol';
    //         const data = [{"ActivityId":"abcd","ActivityType":"Avgang"}]
    //         // Insert test data
    //         await db.collection(colName).insertOne(data);

    //         const result = await database.getCollection(colName);

    //         expect(result).to.deep.equal(data);
    //         await db.client.close();
    //     });
    // });
// });


    // describe('getCollection', () => {
    //     it('should get a collection from the database', async () => {
    //         const db = await database.openDb();
    //         const colName = 'delayed';
    //         const data = [{"ActivityId":"1500adde-f75d-c409-08dc-2a9a9639a12c","ActivityType":"Avgang","AdvertisedTimeAtLocation":"2024-02-26T21:11:00.000+01:00","AdvertisedTrainIdent":"976","Canceled":false,"EstimatedTimeAtLocation":"2024-02-26T21:50:00.000+01:00","FromLocation":[{"LocationName":"Öb","Priority":1,"Order":0}],"LocationSignature":"Cst","OperationalTrainNumber":"976","ToLocation":[{"LocationName":"U","Priority":1,"Order":0}],"TrainOwner":"MÄLAB"},{"ActivityId":"1500adde-f75d-c409-08dc-2a9a5fa41d33","ActivityType":"Avgang","AdvertisedTimeAtLocation":"2024-02-26T21:12:00.000+01:00","AdvertisedTrainIdent":"3841","Canceled":false,"EstimatedTimeAtLocation":"2024-02-26T21:26:00.000+01:00","FromLocation":[{"LocationName":"Uv","Priority":1,"Order":0}],"LocationSignature":"Tof","OperationalTrainNumber":"23851","ToLocation":[{"LocationName":"Vb","Priority":1,"Order":0}],"TrainOwner":"VASTTRAF"}];

    //         // Insert test data
    //         await db.collection(colName).insertMany(data);

    //         const result = await database.getCollection(colName);

    //         expect(result).to.deep.equal([{"ActivityId":"1500adde-f75d-c409-08dc-212cad2aba32","ActivityType":"Avgang","AdvertisedTimeAtLocation":"2024-02-14T14:17:00.000+01:00","AdvertisedTrainIdent":"8190","Canceled":true,"EstimatedTimeAtLocation":"2024-02-14T15:03:00.000+01:00","FromLocation":[{"LocationName":"Ör","Priority":{"$numberInt":"1"},"Order":{"$numberInt":"0"}}],"LocationSignature":"Snv","OperationalTrainNumber":"8190","ToLocation":[{"LocationName":"Gä","Priority":{"$numberInt":"1"},"Order":{"$numberInt":"0"}}],"TrainOwner":"TIB"}, {"ActivityId":"1500adde-f75d-c409-08dc-2a9a9639a12c","ActivityType":"Avgang","AdvertisedTimeAtLocation":"2024-02-26T21:11:00.000+01:00","AdvertisedTrainIdent":"976","Canceled":false,"EstimatedTimeAtLocation":"2024-02-26T21:50:00.000+01:00","FromLocation":[{"LocationName":"Öb","Priority":1,"Order":0}],"LocationSignature":"Cst","OperationalTrainNumber":"976","ToLocation":[{"LocationName":"U","Priority":1,"Order":0}],"TrainOwner":"MÄLAB"},{"ActivityId":"1500adde-f75d-c409-08dc-2a9a5fa41d33","ActivityType":"Avgang","AdvertisedTimeAtLocation":"2024-02-26T21:12:00.000+01:00","AdvertisedTrainIdent":"3841","Canceled":false,"EstimatedTimeAtLocation":"2024-02-26T21:26:00.000+01:00","FromLocation":[{"LocationName":"Uv","Priority":1,"Order":0}],"LocationSignature":"Tof","OperationalTrainNumber":"23851","ToLocation":[{"LocationName":"Vb","Priority":1,"Order":0}],"TrainOwner":"VASTTRAF"}]);
    //         await db.client.close();
    //     });

    //     it('should handle errors during collection retrieval', async () => {
    //         const colName = 'your-collection-name';

    //         // Mocking the db.collection() method to throw an error
    //         sinon.stub(database, 'getCollection').throws(new Error('Collection retrieval error'));

    //         try {
    //             await database.getCollection(colName);
    //         } catch (error) {
    //             expect(error).to.be.an.instanceOf(Error);
    //             expect(error.message).to.equal('Collection retrieval error');
    //         } finally {
    //             sinon.restore();
    //         }
    //     });
    // });
// });



// /**
//  * Test opening and resetting the database
//  */

// /*global it describe before */

// process.env.NODE_ENV = 'test';

// import { should } from 'chai';
// import database from '../../db/database.js';
// import resetCollection from '../../db/setup.js';

// should();

// describe('Test database', () => {
//     /**
//      * Before test, reset the database and remove all collections
//      */
//     before(async () => {
//         const db = await database.openDb();

//         try {
//             const collections = await db.listCollections().toArray();

//             for (const col of collections) {
//                 await db.collection(col.name).drop();
//             }
//         } catch (err) {
//             console.log("During setup following error occured:", err);
//         } finally {
//             await db.client.close();
//         }
//     });

//     /**
//      * Test the database setup function. Maybe this could be removed or moved but
//      * it's good to have a way to easy reset a collection while still in develop-mode that
//      * is separated from the database.js file.
//      */
//     describe('Test reset function', () => {
//         const colName = "testCol";

//         // Resets the collection
//         it('should return empty array', async () => {
//             await resetCollection(colName);

//             const res = await database.getCollection(colName);

//             res.should.be.a('array');
//             res.should.have.lengthOf(0);
//         });

//         // Simulates using an JSON-file as inputdata
//         it('should return 2 documents', async () => {
//             // Using an array to simulate documents from a JSON-file.
//             const doc = [
//                 {
//                     "name": "first document"
//                 },
//                 {
//                     "name": "second document"
//                 }
//             ];

//             await resetCollection(colName, doc);

//             const res = await database.getCollection(colName, doc);

//             res.should.be.a('array');
//             res.should.have.lengthOf(2);
//             res[0].should.have.property("name");
//             res[1].should.have.property("name");
//         });

//         // Resets the collection again
//         it('should return empty array', async () => {
//             await resetCollection(colName);

//             const res = await database.getCollection(colName);

//             res.should.be.a('array');
//             res.should.have.lengthOf(0);
//         });
//     });
// });
