'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('user_buses', (table) => {
    table.increments();
    table.integer('user_id').references('id')
        .inTable('users').onDelete('CASCADE').index();
    table.string('bus_number').notNullable();
    table.string('stop_number').notNullable();
    table.time('start_time');
    table.time('end_time');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_buses');
};