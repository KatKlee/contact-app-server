import { MongoClient } from "mongodb";

// die URL der MongoDB Datenbank
const URL = process.env.MONGODB_URL
const client = new MongoClient(URL)
const DB_NAME = process.env.DB_NAME

let db

export const getDB = () => {
    return new Promise((resolve, reject) => {
        if (db) resolve(db)
        // connect to the chosen database
        client.connect()
            .then(client => client.db(DB_NAME))
            .then(clientDb => {
                // Befüllen der Variablen db mit dem Pfad/Zugriff auf unsere Datenbank
                db = clientDb
                resolve(db)
            })
            .catch(err => reject(err))
    })
}