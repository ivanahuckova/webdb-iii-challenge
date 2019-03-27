const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js').development;
const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

// =========== COHORTS: POST ROUTES ========== //

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

// =========== COHORTS: GET ROUTES ========== //

server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/cohorts/:id', async (req, res) => {
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(400).json({ message: 'Cohort with that id does not exists' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/cohorts/:id/students', async (req, res) => {
  try {
    const arrayOfStudentsFromCohort = await db('students').where({ cohort_id: req.params.id });
    if (arrayOfStudentsFromCohort.length > 0) {
      res.status(200).json(arrayOfStudentsFromCohort);
    } else {
      res.status(400).json({ message: 'Cohort with that id does not have students' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// =========== COHORTS: DELETE ROUTES ========== //
server.delete('/api/cohorts/:id', async (req, res) => {
  try {
    const isCohortDeleted = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    if (isCohortDeleted) {
      res.status(200).json({ message: `Cohort with id ${req.params.id} was delted` });
    } else {
      res.status(400).json({ message: 'Cohort with that id does not exists' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));
