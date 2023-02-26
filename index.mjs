import express from 'express'
import routerEmployer from './server/employer.mjs'
import routerPackage from './server/package.mjs'
import routerDelivery from './server/delivery.mjs'


const app = express()
app.use('/api', routerEmployer)
app.use('/api', routerPackage)
app.use('/api', routerDelivery)

app.listen(2000, () => { 
    console.log("Serveur à l'écoute sur http://localhost:2000")       
})