import express from 'express'
import routerPackage from './server/package.mjs';

const app = express()

app.use('/api', routerPackage);

app.listen(2000, () => { 
    console.log("Serveur à l'écoute sur http://localhost:2000")       
})