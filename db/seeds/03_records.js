exports.seed = function(knex, Promise) {
  return knex('records').del()
    .then(function () {
      return Promise.all([
        knex('records').insert({user_id: 1, category_id: 11, value:100000, notes: 'Salary for April', date: '2019-03-26' })
      ]);
    });
}