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

export const updateContact = (contactBody) => {

    const id = contactBody._id

    const contact = {
        firstname: contactBody.firstname,
        lastname: contactBody.lastname,
        tel: contactBody.tel,
        address: {
            street: contactBody.address.street,
            housenr: contactBody.address.housenr,
            postcode: contactBody.address.postcode,
            city: contactBody.address.city
        },
        favourite: contactBody.favourite
    }
    return new Promise((resolve, reject) => {
        getDB()
            .then(db => db.collection('kontakte').updateOne({ _id: new ObjectId(id) }, { $set: { ...contact } }))
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}

export const deleteContact = (id) => {
    console.log(id)
    return new Promise((resolve, reject) => {
        getDB()
            .then(db => db.collection('kontakte').deleteOne({ _id: new ObjectId(id) }))
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}