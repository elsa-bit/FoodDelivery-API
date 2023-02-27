import express from 'express'
import pool from '../../dbConfig.mjs'

const routerDelivery = express.Router();
const pools = pool.pool

routerDelivery.post('/createDelivery', async (req, res) => {
    try {
        const id = req.query.idEmployer;

        const countEmployer = await pools.query('SELECT COUNT(*) FROM employer WHERE id = $1', [id])
        let countEmployerTotal = countEmployer.rows[0].count

        if (countEmployerTotal != 0) {
            const result = await pools.query('INSERT INTO delivery (delivery_date , id_employer) VALUES (now(),$1) RETURNING id',
              [id]);
            const delivery_id = result.rows[0].id;
            res.json({ status: 200, delivery: delivery_id, error: null });
        } else {
            res.status(401).send("The insertion could not be performed because this employer does not exists");
        }
        pools.end;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error server");
    }
    res.end
});

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

routerDelivery.put('/editDelivery', async (req, res) => {
    try {
        const id = req.query.idDelivery;
        const city = req.query.city;
        const date = req.query.date

        await pools.query('UPDATE delivery SET delivery_date=$1, delivery_location=$2 WHERE id=$3', [date, city,id]);
        const verifyModificated = pools.query('SELECT delivery_date, delivery_location, id_employer FROM delivery WHERE id=$1', [id]);
        if (city == verifyModificated.rows[0].delivery_location && date == verifyModificated.rows[0].delivery_date) {
            res.json({ status: 200, delivery: "Success", error: null });
        } else {
            res.status(401).send("The modification could not be performed");
        }

        pools.end;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error server");
    }
    res.end
});

routerDelivery.delete('/deleteDelivery', async (req, res) => {
    try {
        const id = req.query.idDelivery;
        const verifyDeleted = await pools.query('SELECT * FROM delivery WHERE id=$1', [id]);

        if (verifyDeleted.rows.length > 0) {
            await pools.query('DELETE FROM delivery WHERE id=$1', [id]);
            res.json({ status: 200, delivery: "Success", error: null });
        } else {
            res.status(401).send("This delivery cannot be found");
        }
        pools.end;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error server");
    }
    res.end
});

export default routerDelivery