const { ObjectID } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    async create(name, password, tags = []) {
        if(!name || typeof(name) !== 'string' || name.trim() === ""){
            throw "ERROR: Invalid name input";
        }
        let users_list = await this.getAll();
        for(let i = 0; i < users_list.length; i++){
          if(users_list[i].name === name){
            throw `ERROR: User with name ${name} is already in the system`
          }
        }
        if(!password || typeof(password) !== 'string' || password.trim() === ""){
            throw "ERROR: Invalid password input";
        }
        const userCollection = await users();
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        let newUser = {
            name: name.trim,
            password: hashedPassword,
            tags: tags
        }
        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) throw 'Could not add user';
        const newId = insertInfo.insertedId;
        let user = await this.get(newId);
        return user;
    },
    async getAll() {
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        if(userList === []){
            throw 'ERROR: There are no users in this database'
        }
        return userList
    },
    async get(id) {
        if (!id) throw 'ERROR: You must provide an id to search for';
        if (typeof(id) !== 'object') throw 'ERROR: id is not an object';
        if(!ObjectID.isValid(id)) throw 'ERROR: Invalid object id'
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: id});
        if (user === null) throw 'ERROR: No user with that id';
        return user;
    },
    async getByName(name) {
        if(!name || typeof(name) !== 'string' || name.trim() === ""){
            throw "ERROR: Invalid name input";
        }
        const userCollection = await users();
        const user = await userCollection.findOne({name});
        if (user === null) throw 'ERROR: No user with that name';
        return user;
    },
    async updateTags(id, tags = []) {
        if (!id) throw 'ERROR: You must provide an id to search for';
        if (typeof(id) !== 'object' ) throw 'ERROR: Invalid ID input';
        if(!ObjectID.isValid(id)) throw 'ERROR: Invalid object id';
        const userCollection = await users();
        let taggedUser = await userCollection.findOne({ _id: ObjectID(id)});
        Array.prototype.push.apply(tags, taggedUser.tags);
        const updatedUser = await userCollection.updateOne(
            {_id: ObjectID(id)},
            {$push: {tags: {$each: tags}}}
        );
        if (!updatedUser.matchedCount && !updatedUser.modifiedCount){
            throw 'Update tags failed';
        }
        return this.get(ObjectID(id));
    }
};