/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// need id, name, desc, quant, and userID 
exports.up = function(knex) {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.text('description').notNullable();
  table.integer('quantity').notNullable();
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
