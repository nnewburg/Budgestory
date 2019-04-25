exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({parent_id: 0, name: 'Expenses', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 0, name: 'Incomes', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Clothes', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Eating Out', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Entertainment', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Fuel', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Gifts', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Holidays', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Sports', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Kids', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 2, name: 'Salary', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 2, name: 'Savings', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 2, name: 'Deposit', notes: '', icon: ''})

      ]);
    });
}