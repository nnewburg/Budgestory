exports.up = function(knex, Promise) {
   return knex.schema.createTable('records', function (table) {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.integer('category_id').unsigned().notNullable();
    table.foreign('category_id').references('id').inTable('categories');
    table.integer('value');
    table.string('notes');
    table.date('date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('records');
};

