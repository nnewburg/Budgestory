exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({first_name: 'Dave', last_name: 'Rod', email:'dave@gmail.com', password:'123'}),
        knex('users').insert({first_name: 'Sam', last_name: 'Door', email:'sam@gmail.com', password:'123'}),
        knex('users').insert({first_name: 'Bob', last_name: 'Hill', email:'bob@gmail.com', password:'123'})
      ]);
    });
}