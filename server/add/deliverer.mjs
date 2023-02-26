import express from 'express'
import pool from '../../dbConfig.mjs'
import * as http from "http";


const pools = pool.pool

const routerADDDeliverer = express.Router()

routerADDDeliverer.post('/deliverer', async (req, res) => {
  const client = await pools.connect();
  try {
    const name = req.query.name
    const firstname = req.query.firstname
    const total = req.query.total
    const photo = req.query.photo
    const phone = req.query.phone
    const evaluation = req.query.evaluation
    const email = req.query.email;
    const password = req.query.password;
    const longitude = parseFloat(req.query.longitude);
    const latitude = parseFloat(req.query.latitude);

    http.get('http://localhost:2000/api/location/last', (resp) => {
      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', async () => {
        let idLocation = JSON.parse(data)
        idLocation = idLocation["package"].id_location;
        idLocation++;
        await client.query('BEGIN');
        await client.query('INSERT INTO location (location_latitude, location_longitude) VALUES ($1, $2)', [latitude, longitude]);
        await client.query('INSERT INTO deliverer (deliverer_name, deliverer_firstname, deliverer_email, deliverer_password, deliverer_phone, deliverer_photo, deliverer_evaluation, deliverer_location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);', [name, firstname, email, password, phone, photo, evaluation, idLocation]);
        await client.query('COMMIT');
        res.json({status: 200, error: null});
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({status:500, login: {}, error:"Error server"})
  } finally {
    client.release();
  }
});

export default routerADDDeliverer;