import './config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { addContact, deleteEintrag, getAllContacts, updateAdressbuch } from './controller/kontaktController.js'


// 
const PORT = process.env.PORT
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// All Routes
app.get('/', (req, res) => {
    res.status(200).send('Alles OKAY')
})
app.get('/contact', getAllContacts) // brauche ich die?
app.post('/contact', addContact)
app.put('/contact', updateAdressbuch)
app.delete('/contact', deleteEintrag)




// To start the server
app.listen(PORT, () => console.log('Server runs on Port:', PORT))