import express from 'express'
import routerPackage from './server/package.mjs';
import routerLogin from "./server/bossLogin.mjs";
import routerDeliverers from "./server/deliverers.mjs";
import routerDELeliver from "./server/delDeliverer.mjs";

const app = express()

app.use('/api', routerPackage);
app.use('/api', routerLogin);
app.use('/api', routerDeliverers);
app.use('/api', routerDELeliver);
app.listen(2000, () => { 
    console.log("Serveur à l'écoute sur http://localhost:2000")       
})