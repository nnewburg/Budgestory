const express = require('express');
const path = require('path');
const ENV         = process.env.ENV || "development";
const bodyParser  = require("body-parser");
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getCategories', (req,res) => {
  knex.select().from('categories')
      .then((results) => {
        res.json({
          data: results
        });
      })
});

app.get('/api/getRecords', (req,res) => {
  knex.select().from('records')
      .then((results) => {
        res.json({
          data: results
        });
      })
});

app.post('/api/regist', (req,res) => {
  knex('users').insert([{name: req.body.user.name, password: req.body.user.password, email: req.body.user.email}])
  .then(result =>
    {res.redirect('/')})
  });

app.post('/newCategory', (req,res) => {
  console.log(req.body)
  knex('categories').insert([{name: req.body.newCat.name, parent_id: req.body.newCat.parent_id}]).then(result =>
    {res.redirect('/categories')})
});

app.post('/newRecord', (req,res) => {
  console.log(req.body)
  knex('records').insert([{user_id: 1, notes: req.body.newRec.notes, category_id: req.body.newRec.category_id, value: req.body.newRec.value}]).then(result =>
    {res.redirect('/categories')})
});





app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('BS >>> App is listening on port ' + port);
