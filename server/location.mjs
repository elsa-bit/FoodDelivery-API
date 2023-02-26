import express from 'express'
import pool from '../dbConfig.mjs'

const routerLastLocation = express.Router();
const pools = pool.pool

routerLastLocation.get('/location/last', async (req, res) => {
  try {
    const getLocation = await pools.query('SELECT id_location from location ORDER BY id_location DESC LIMIT 1;');
    if (getLocation.rows.length > 0) {
      res.json({ status: 200, package: getLocation.rows[0], error: null });
    } else {
      res.status(401).send("This package does not exist");
    }
    pools.end;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error server");
  }
  res.end
});

export default routerLastLocation