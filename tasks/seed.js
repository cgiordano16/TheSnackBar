const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const users = data.users;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    const chrisG = await users.create('ChrisG', 'helloworld');
    const updatedCGTags = await users.updateTags(chrisG._id, ['chips']);
    console.log('Done seeding database');
    // await db.serverConfig.close();
}

main();