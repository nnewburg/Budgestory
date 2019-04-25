exports.seed = function(knex, Promise) {
  return knex('records').del()
    .then(function () {
      return Promise.all([
        knex('records').insert({user_id: 1, category_id: 11, value:100000, notes: 'Salary for April', date: '2019-03-26' }),
        knex('records').insert({user_id: 1, category_id: 3, value: 2000, notes: 'Bought some shoes', date: '2019-03-26'}),
        knex('records').insert({user_id: 1, category_id: 5, value:3000, notes: 'Went to Avengers', date: '2019-03-26'}),
        knex('records').insert({user_id: 1, category_id: 5, value:1000, notes: 'Bought popcorn at Avengers', date: '2019-03-26'}),
        knex('records').insert({user_id: 1, category_id: 6, value:3000, notes: 'Stopped at gas station', date: '2019-03-26'})
      ]);
    });
}