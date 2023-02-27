import express from 'express'
import routerPackage from './server/package.mjs';
import routerLogin from "./server/bossLogin.mjs";
import routerDeliverers from "./server/deliverers.mjs";
import routerDELeliver from "./server/delete/deliverer.mjs";
import routerUPDDeliverer from "./server/update/deliverer.mjs";
import routerADDDeliverer from "./server/deliverer.mjs";
import routerLastLocation from "./server/location.mjs";
import routerEmployer from './server/employer.mjs';
import routerDelivery from "./server/delivery.mjs";

const app = express()

app.use('/api', routerPackage);
app.use('/api', routerDeliverers);
app.use('/api', routerDELeliver);
app.use('/api', routerUPDDeliverer);
app.use('/api', routerADDDeliverer);
app.use('/api', routerLastLocation);
app.use('/api', routerEmployer);
app.use('/api', routerDelivery);
app.use('/api', routerLogin);

app.listen(2000, () => { 
    console.log("Serveur à l'écoute sur http://localhost:2000")  ;
})