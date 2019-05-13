
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function (table) {
   table.increments('id');
    table.integer('parent_id');
    table.string('name');
    table.string('notes');
    table.string('icon');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories');
};
