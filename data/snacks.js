const { ObjectID } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const { getAll, get } = require('./users');
const snacks = mongoCollections.snacks;

module.exports = {
    async create(name, description = '', tags = []) {
        if(!name || typeof(name) !== 'string' || name.trim() === ""){
            throw "ERROR: Invalid name input";
        }
        let snack_list = await this.getAll();
        for(let i = 0; i < snack_list.length; i++){
          if(snack_list[i].name === name){
            throw `ERROR: Snack with name ${name} is already in the system`
          }
        }
        let newSnack = {
            name: name.trim(),
            description: description,
            tags: tags
        }
        const insertInfo = await snackCollection.insertOne(newSnack);
        if (insertInfo.insertedCount === 0) throw 'Could not add snack';
        const newId = insertInfo.insertedId;
        let snack = await this.get(newId);
        return snack;
    },
    async getAll() {
        const snackCollection = await snacks();
        const snackList = await snackCollection.find({}).toArray();
        if(snackList === []){
            throw 'ERROR: There are no users in this database'
        }
        return snackList
    },
    async get(id) {
        if (!id) throw 'ERROR: You must provide an id to search for';
        if (typeof(id) !== 'object') throw 'ERROR: id is not an object';
        if(!ObjectID.isValid(id)) throw 'ERROR: Invalid object id'
        const snackCollection = await snacks();
        const snack = await snackCollection.findOne({ _id: id});
        if (snack === null) throw 'ERROR: No user with that id';
        return snack;
    }
}