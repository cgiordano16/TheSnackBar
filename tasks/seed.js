const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const users = data.users;
const snacks = data.snacks;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    const chrisG = await users.create('ChrisG', 'helloworld');
    const updatedCGTags = await users.updateTags(chrisG._id, ['chips']);
    const makeWelchs = await snacks.create(`Welch's Fruit Snacks`, `Gummy snack that has the flavor of different fruits.`, [`Gummy`, `Fruit`, `Welch's`]);
    console.log('Done seeding database');
    await db.serverConfig.close();
}

main();