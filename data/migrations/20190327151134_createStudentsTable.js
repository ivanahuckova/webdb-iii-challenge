exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', table => {
    table.increments();
    table.string('name', 128).notNullable();
    table.integer('cohort_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
