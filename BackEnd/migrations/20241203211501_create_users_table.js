/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// https://stackoverflow.com/questions/69039072/unable-to-use-knex-to-create-tables-and-send-data-to-the-database-i-had-problems
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('password').notNullable;
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
