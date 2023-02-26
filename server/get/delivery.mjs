import express from 'express'
import pool from '../../dbConfig.mjs'

const routerDelivery = express.Router();
const pools = pool.pool

routerDelivery.get('/employerDelivery', async (req, res) => {
    try {
        const id = req.query.idEmployer;

        const countEmployer = await pools.query('SELECT COUNT(*) FROM employer WHERE id = $1', [id])
        let countEmployerlist = countEmployer.rows[0].count

        if (countEmployerlist != 0) {
            const getDelivery = await pools.query('SELECT id, delivery_date, delivery_location FROM delivery WHERE id_employer=$1 ORDER BY delivery_date', [id]);
            if (getDelivery.rows.length > 0) {
                res.json({ status: 200, delivery: getDelivery.rows, error: null });
            } else {
                res.status(401).send("There are no delivery for this employer");
            }
        } else {
            res.status(401).send("This employer does not exist");
        }
        pools.end;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error server");
    }
    res.end
});

export default routerDelivery