import { ObjectId } from "mongodb"
import { deleteContact, getAll, updateContact } from "../services/kontaktService.js"
import { getDB } from "../util/db.js"

// Get all contact entries and put them into a json
export const getAllContacts = (req, res) => {
    getAll()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }))
}

export const addContact = (req, res) => {
    const contact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        tel: req.body.mobile,
        address: {
            street: req.body.street,
            housenr: req.body.housenr,
            postcode: req.body.postcode
        },
        favourite: req.body.favourite
    }
    getDB()
        .then(db => db.collection("kontakte").insertOne(contact))
        .then(dbresult => {
            res.status(200).json(dbresult)
        })
        .catch(err => res.status(500).json({ error: err }))

}

export const updateAdressbuch = (req, res) => {
    const id = req.body._id

    updateContact(id)
        .then(result => {
            if (result.acknowledged) {
                getAll()
                    .then(allContacts => res.status(200).json(allContacts))
            }
        })
        .catch(err => {
            console.log('update hat nicht geklappt', err)
            res.status(500).json({ error: err })
        })
}

export const deleteEintrag = (req, res) => {
    const id = req.body._id

    deleteContact(id)
        .then(result => {
            if (result.acknowledged) {
                getAll()
                    .then(allContacts => res.status(200).json(allContacts))
            }
        })
        .catch(err => res.status(500).json({ error: err }))
}