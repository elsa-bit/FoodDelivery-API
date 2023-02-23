import express from 'express'
import routerPackage from './server/package.mjs';
import routerLogin from "./server/bossLogin.mjs";

const app = express()

app.use('/api', routerPackage);
app.use('/api', routerLogin);

app.listen(2000, () => { 
    console.log("Serveur à l'écoute sur http://localhost:2000")       
})