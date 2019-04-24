exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Dr. Facilier', email:'voodooman@gmail.com', password:'1'}),
        knex('users').insert({name: 'Dr. Facilier', email:'voodooman@gmail.com', password:'1'}),
        knex('users').insert({name: 'Dr. Facilier', email:'voodooman@gmail.com', password:'1'}),
        knex('users').insert({name: 'Dr. Facilier', email:'voodooman@gmail.com', password:'1'}),
      ]);
    });
}