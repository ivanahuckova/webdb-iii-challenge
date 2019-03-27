const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js').development;
const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

// =========== POST ROUTES ========== //

server.post('/api/cohorts', async (req, res) => {
  try {
    const id = await db('cohorts').insert(req.body);
    const newCohort = await db('cohorts')
      .where({ id: id[0] })
      .first();
    res.status(201).json(newCohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));
