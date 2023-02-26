import express from 'express'
import pool from '../dbConfig.mjs'

const routerLogin = express.Router();
const pools = pool.pool

routerLogin.get('/login', async (req, res) => {
    try {
        const email = req.query.email;
        const password = req.query.password;

        const getLogin = await pools.query('SELECT employer_email, employer_password FROM employer WHERE employer_email=$1 AND employer_password=$2', [email, password]);
        if (getLogin.rows.length > 0) {
            res.json({ status: 200, employer: getLogin.rows[0], error: null });
        } else {
            //res.json({ status: 401, employer_email: null, employer_password: null,  error: "This login does not exist" });
            res.status(401).send("This login does not exist");
            //res.status(401).send({status:401, login: {}, error:"This login does not exist"});
        }
        pools.end;
    } catch (error) {
        console.error(error);
        res.json({status:500, employer_email: null, employer_password: null, error:"Error server"})
        //res.status(500).send("Error server");
    }
    res.end
});

export default routerLogin