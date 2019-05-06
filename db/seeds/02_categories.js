exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({parent_id: 0, name: 'Expenses', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 0, name: 'Incomes', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 2, name: 'Salary', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 2, name: 'Interest Revenue', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 2, name: 'Stock Dividends', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Clothes', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 6, name: 'Shoes', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 6, name: 'Shirts', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 6, name: 'Pants', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 6, name: 'miscellaneous', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 7, name: 'Dress Shoes', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 7, name: 'Sandals', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 7, name: 'Sports Shoes', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 8, name: 'Dress Shirts', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 8, name: 'Casual Shirts', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 9, name: 'Dress Pants', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 9, name: 'Jeans', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 9, name: 'Shorts', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Food', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 19, name: 'Coffee', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 19, name: 'Eating Out', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 21, name: 'Restaurant', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 21, name: 'Bar', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 19, name: 'Groceries', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 19, name: 'Delivery', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 25, name: 'Pizza', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 25, name: 'Chinese', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 25, name: 'Sushi', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 25, name: 'Thai', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Entertainment', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 30, name: 'Movies', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 30, name: 'Dancing', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 32, name: 'Coat Check', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 32, name: 'Drinks', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 32, name: 'Transport', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 30, name: 'Amusement Park', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 36, name: 'Rides', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 36, name: 'Food', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 36, name: 'Games', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Travel', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 40, name: 'Public Transit', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 41, name: 'Bus', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 41, name: 'SkyTrain', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 40, name: 'Car', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 44, name: 'Gas', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 44, name: 'Insurance', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 44, name: 'Maintenance', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 44, name: 'Parking', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 40, name: 'Taxi', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 1, name: 'Bills', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 50, name: 'Hydro', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 50, name: 'Cell Phone', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 50, name: 'Home Insurance', notes: '', icon: ''}),
        knex('categories').insert({parent_id: 50, name: 'Mortage', notes: '', icon: ''})
      ]);
    });
}