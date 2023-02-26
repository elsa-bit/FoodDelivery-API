import express from 'express'
import pool from '../../dbConfig.mjs'

const pools = pool.pool
const routerDELeliver = express.Router()

routerDELeliver.delete('/deliverer/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getDeliverers = await pools.query('DELETE FROM deliverer WHERE id_deliverer=$1', [id]);
    res.json({ status: 200, error: null });
    pools.end;
  } catch (error) {
    console.error(error);
    res.json({status:500, login: {}, error:"Error server"})
    //res.status(500).send("Error server");
  }
  res.end
});

export default routerDELeliver;