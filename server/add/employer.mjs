import express, { query } from 'express'
import pool from '../../dbConfig.mjs'
import bcrypt from 'bcrypt'

const routerEmployer = express.Router();

const pools = pool.pool

routerEmployer.post('/createEmployer', async (req, res) => {
  try {
    const employer_name = req.query.employer_name;
    const employer_firstname = req.query.employer_firstname;
    const employer_phone = req.query.employer_phone;
    const employer_email = req.query.employer_email;
    const employer_password = req.query.employer_password;

    const countEmployer = await pools.query('SELECT COUNT(*) FROM employer WHERE employer_email = $1', [employer_email])
    let countEmployerLastname = countEmployer.rows[0].count

    const cryptpassword = await bcrypt.hash(employer_password, 10);

    if (countEmployerLastname == 0) {
      const result = await pools.query('INSERT INTO employer (employer_name , employer_firstname, employer_phone, employer_email, employer_password ) VALUES ($1,$2,$3,$4,$5) RETURNING id',
        [employer_name, employer_firstname, employer_phone, employer_email, cryptpassword]);
      const employer_id = result.rows[0].id;
      res.json({ status: 200, employer: employer_id, error: null });
    } else {
      res.status(401).send("The insertion could not be performed because this email already exists");
    }
    pools.end;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error server");
  }
  res.end
});


routerEmployer.post('/login', async (req, res) => {
  try {
    const email = req.query.email;
    const password = req.query.password;

    const getLogin = await pools.query('SELECT id, employer_email, employer_password FROM employer WHERE employer_email=$1 AND employer_password=$2', [email, password]);
    if (getLogin.rows.length > 0) {
      res.json({ status: 200, employer: getLogin.rows[0], error: null });
    } else {
      res.json({status:401, login: {}, error:"This login does not exist"})
    }
    pools.end;
  } catch (error) {
    console.error(error);
    res.json({status:500, login: {}, error:"Error server"})
  }
  res.end
});

export default routerEmployer