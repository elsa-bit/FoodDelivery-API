import express, { query } from 'express'
import pool from '../dbConfig.mjs'

const routerPackage = express.Router();

const pools = pool.pool


routerPackage.get('/packageSpecialEmployer', async (req, res) => {
    try {
        const id_employer = req.query.idEmployer;

        const getPackage = await pools.query('SELECT id, package_name, package_destination_city FROM package WHERE package_id_employer=$1 ORDER BY package_deadline', [id_employer]);
        if (getPackage.rows.length > 0) {
            res.json({ status: 200, package: getPackage.rows, error: null });
        } else {
            res.status(401).send("There are no packages for this employer");
        }
        pools.end;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error server");
    }
    res.end
});

routerPackage.get('/packageDetails', async (req, res) => {
    try {
        const id= req.query.idPackage;

        const getPackage = await pools.query('SELECT id, package_name, package_weight, package_deadline, package_note, package_destination_number, package_destination_street, package_destination_city, package_destination_zip, package_recovery_city FROM package WHERE id=$1 AND package_photo IS NULL', [id]);
        if (getPackage.rows.length > 0) {
            res.json({ status: 200, package: getPackage.rows[0], error: null });
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

routerPackage.get('/packageDelivery', async (req, res) => {
    try {
        const id_delivery = req.query.idDelivery;

        const getPackage = await pools.query('SELECT id, package_name, package_destination_city, package_recovery_city FROM package WHERE package_id_delivery=$1 ORDER BY package_deadline', [id_delivery]);
        if (getPackage.rows.length > 0) {
            res.json({ status: 200, package: getPackage.rows, error: null });
        } else {
            res.status(401).send("There are no packages for this delivery");
        }
        pools.end;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error server");
    }
    res.end
});

export default routerPackage