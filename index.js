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
app.get('/api/getList', (req,res) => {
  knex.select().from('records')
      .then((results) => {
       console.log(">>> results = ", results);
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

// app.get('/api/getList', (req,res) => {
//   var list = ["item1", "item2", "item3"];
//   res.json(list);
//   console.log('Sent list of items');
// });
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);



  //   var list = ["item1", "item2", "item3"];
  // res.json(list);
  // console.log(knex);