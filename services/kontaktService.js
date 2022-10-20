import { ObjectId } from "mongodb"
import { getDB } from "../util/db.js"

// Get all entries in the database "adressbuch" in collection "kontakte"
export const getAll = () => {
    return new Promise((resolve, reject) => {
        // getDB() function to make a connection to the database "adressbuch"
        getDB()
            // directions what to do
            .then(db => db.collection('kontakte').find().toArray()) // put all entries found into an array
            .then(result => resolve(result)) // fullfilled > return the result
            .catch(err => reject(err)) // rejected > show error
    })
}

export const updateContact = (_id) => {
    return new Promise((resolve, reject) => {
        getDB()
            .then(db => db.collection('kontakte').updateOne({ _id: new ObjectId(contact._id) }, { $set: { ...contact } }))
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}

export const deleteContact = (_id) => {
    return new Promise((resolve, reject) => {
        getDB()
            .then(db.collection('kontakte').deleteOne({ _id: new ObjectId(_id) }))
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}