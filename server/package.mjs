import express from 'express'
import pool from '../dbConfig.mjs'

const routerPackage = express.Router();
const pools = pool.pool

routerPackage.get('/package', async (req, res) => {
    try {
        const id = req.query.idPackage;

        const getPackage = await pools.query('SELECT id_package, package_name, package_weight, package_deadline, package_note, package_destination_number, package_destination_street, package_destination_city, package_destination_zip, package_recovery_city FROM package WHERE id_package=$1', [id]);
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

export default routerPackage