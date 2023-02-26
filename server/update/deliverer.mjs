import express from 'express'
import pool from '../../dbConfig.mjs'

const pools = pool.pool
const routerUPDDeliverer = express.Router()

routerUPDDeliverer.post('/deliverer/:id', async (req, res) => {
  const client = await pools.connect();
  try {
    const email = req.query.email;
    const password = req.query.password;
    const phone = req.query.phone;
    const longitude = req.query.longitude;
    const latitude = req.query.latitude;
    const id = parseInt(req.params.id);

    await client.query('BEGIN');
    await client.query('UPDATE deliverer SET deliverer_email=$1, deliverer_password=$2, deliverer_phone=$3 WHERE id_deliverer=$4', [email, password, phone, id]);
    await client.query('UPDATE location SET location_longitude=$1, location_latitude=$2 FROM deliverer WHERE location.id_location=deliverer.deliverer_location AND deliverer.id_deliverer=$3', [longitude, latitude, id]);
    await client.query('COMMIT');
    res.json({ status: 200, error: null });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({status:500, login: {}, error:"Error server"})
  } finally {
    client.release();
  }
});

export default routerUPDDeliverer;