import express from 'express'
import pool from '../dbConfig.mjs'

const routerDeliverers = express.Router();
const pools = pool.pool

routerDeliverers.get('/deliverers', async (req, res) => {
  try {
    const getDeliverers = await pools.query('SELECT deliverer.id_deliverer, deliverer.deliverer_firstname,\n' +
      '       deliverer.deliverer_name, deliverer.deliverer_email, deliverer.deliverer_phone,\n' +
      '       deliverer.deliverer_password, deliverer.deliverer_photo,\n' +
      '       deliverer.deliverer_total, location.location_latitude, location.location_longitude, deliverer.deliverer_evaluation FROM deliverer JOIN location on deliverer.deliverer_location = location.id_location');
    if (getDeliverers.rows.length > 0) {
      res.json({ status: 200, deliverers: getDeliverers.rows, error: null });
    } else {
      res.json({status:401, error:"This login does not exist"})
      //res.status(401).send({status:401, login: {}, error:"This login does not exist"});
    }
    pools.end;
  } catch (error) {
    console.error(error);
    res.json({status:500, login: {}, error:"Error server"})
    //res.status(500).send("Error server");
  }
  res.end
});

export default routerDeliverers;