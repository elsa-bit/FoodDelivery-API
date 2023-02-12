import express from 'express'

const app = express()

app.listen(2000, () => { 
    console.log("Serveur à l'écoute sur http://localhost:2000")       
})