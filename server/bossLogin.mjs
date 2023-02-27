import express from 'express'
import pool from '../dbConfig.mjs'
import bcrypt from 'bcrypt'

const routerLogin = express.Router();
const pools = pool.pool

routerLogin.post('/loginBoss', async (req, res) => {
    try {
        const email = req.query.email;
        const password = req.query.password;

        const getBoss = await pools.query('SELECT * FROM employer WHERE employer_email=$1', [email]);
        if (getBoss.rows.length > 0) {
            let boss = getBoss.rows[0]
            let bossPassword = boss['employer_password']
            const isValidPassword = await bcrypt.compare(password, bossPassword)
            if (isValidPassword) {
                const getLogin = await pools.query('SELECT id, employer_email, employer_password FROM employer WHERE id=$1', [boss['id']]);
                if (getLogin.rows.length > 0) {
                    res.json({ status: 200, employer: getLogin.rows[0], error: null });
                } else {
                    res.status(401).send("This login does not exist");
                }
            } else {
                res.status(401).send("Invalid password");
            }
        } else {
            res.status(401).send("Boss doesn't exist");
        }
        pools.end;
    } catch (error) {
        console.error(error);
        res.json({status:500, employer: {}, error:"Error server"})
    }
    res.end
});

export default routerLogin