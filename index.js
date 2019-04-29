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

// knex('categories').select()
// .then(categories => {
//   console.log("BS >>> categories = ", JSON.parse(JSON.stringify(categories)))
//   // let record = categories.map(category => {
//   //   return knex('categories').select().where('parent_id', category.id)
//   // });
//   // return Promise.all(categories);
//   return categories;
// })
// .then(results => {
//   console.log("BS >>> results1 = ", JSON.parse(JSON.stringify(results)));
//   return results.map(children => {
//     return { name: 'blah', data: children }
//   })
// })
// .then(results => {
//   console.log("BS >>> results2 = ", JSON.parse(JSON.stringify(results)));
//   // console.log(JSON.stringify(results, null, 2));
// })
// .catch(err => console.error(err));

let balanceObj = {};
let allCategories = [];
let allRecords = [];
let balanceChart = {}

function balanceInitialization() {
  balanceObj = {id: 0, parent_id: -1, name:"Balance", type: "category", value: 0, children: []};
  balanceChart = {
    series: [
      {
        name: "Balance",
        id: "Balance",
        data: [
          { name: "Expenses", y: 0, v: 0, drilldown: 1},
          { name: "Incomes", y: 0, v: 0, drilldown: 2}
        ]
      }
    ],
    drilldown: {
      series: []
    }
  }
}

function transferToChart() {
  // Series
  let totalExpenses = balanceObj.children[0].value;
  let totalIncomes = balanceObj.children[1].value;
  let totalValue = totalExpenses + totalIncomes;
  balanceChart.series[0].data[0].name = balanceObj.children[0].name;
  balanceChart.series[0].data[1].name = balanceObj.children[1].name;
  balanceChart.series[0].data[0].v = totalExpenses/100;
  balanceChart.series[0].data[1].v = totalIncomes/100;
  balanceChart.series[0].data[0].y = (totalExpenses/totalValue)*100;
  balanceChart.series[0].data[1].y = (totalIncomes/totalValue)*100;
  balanceChart.series[0].data[0].drilldown = balanceObj.children[0].id;
  balanceChart.series[0].data[1].drilldown = balanceObj.children[1].id;
  // Drilldown
  if(allCategories.length > 0) {
    allCategories.map(category => {
      createSeriesObj(category);
    });
  }
  // if(allRecords.length > 0) {
  //   allRecords.map(record => {
  //     createSeriesObj(record);
  //   });
  // }
}

function createChildrenData(categoryObj) {
  let childrenArray = [];
  let childrenObj = {};
  if(allCategories.length > 0) {
    allCategories.map(category => {
      if(category.parent_id === categoryObj.id) {
        childrenObj = {}; // Clean child object before a new input
        childrenObj.name = category.name;
        childrenObj.v = category.value/100;
        childrenObj.y = (category.value/categoryObj.value)*100;
        if(categoryObj.children.length > 0) {
          childrenObj.drilldown = category.id;
        } else {
          childrenObj.drilldown = null;
        }
        childrenArray.push(childrenObj);
      }
    });
  }
  if(allRecords.length > 0) {
    allRecords.map(record => {
      if(record.category_id === categoryObj.id) {
        childrenObj = {}; // Clean child object before a new input
        childrenObj.name = record.notes;
        childrenObj.v = record.value/100;
        childrenObj.y = (record.value/categoryObj.value)*100;
        childrenObj.drilldown = null;
        childrenArray.push(childrenObj);
      }
    });
  }
  return childrenArray;
}

function createSeriesObj(categoryObj) {
  let seriesObj = {};
  seriesObj.name = categoryObj.name;
  seriesObj.id = categoryObj.id;
  seriesObj.data = createChildrenData(categoryObj);
  balanceChart.drilldown.series.push(seriesObj);
}

function findAllChildren(category_record_Obj) {
  let children = [];
  if(category_record_Obj.type === "category") {
    if(allCategories.length > 0) {
      allCategories.map(category => {
        if(category.parent_id === category_record_Obj.id) {
          category.type = "category";
          category.value = 0;
          category.children = findAllChildren(category);
          children.push(category);
        }
      });
    }
    if(allRecords.length > 0) {
      allRecords.map(record => {
        if(record.category_id === category_record_Obj.id) {
          record.type = "record";
          record.children = [];
          children.push(record);
        }
      });
    }
  } else {
    if(allRecords.length > 0) {
      allRecords.map(record => {
        if(record.category_id === category_record_Obj.id) {
          record.type = "record";
          record.children = [];
          children.push(record);
        }
      });
    }
  }
  return children;
}

function calculateValue(category_record_Obj) {
  let valueTotal = 0;
  if(allCategories.length > 0) {
    allCategories.map(category => {
      if(category.parent_id === category_record_Obj.id) {
        let valueAdd = calculateValue(category);
        category.value += valueAdd;
        if(category_record_Obj.id === 0 && category.id === 1) {
          valueAdd *= -1;
        }
        valueTotal += valueAdd;
      }
    });
  }
  if(allRecords.length > 0) {
    allRecords.map(record => {
      if(record.category_id === category_record_Obj.id) {
        valueTotal += record.value;
      }
    });
  }
  return valueTotal;
}

// An api endpoint that returns a short list of items
app.get('/api/HomeChart', (req,res) => {
  
  // Select all Categories
  knex('categories').select()
  .then(categories => {
    return Promise.all(JSON.parse(JSON.stringify(categories)));
  })
  .then(results => {
    // Select all Categories
    allCategories = results;
    
    knex('records').select()
    .then(records => {
      // Select all Records
      allRecords = JSON.parse(JSON.stringify(records));

      balanceInitialization();
      balanceObj.children = findAllChildren(balanceObj);
      balanceObj.value += calculateValue(balanceObj);
      transferToChart();
      
      console.log("balanceChart.series = ", balanceChart.series);
      console.log("balanceChart.drilldown = ", balanceChart.drilldown);
      res.json(balanceChart);
    })
    .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
});

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
  
  // Handles any requests that don't match the ones above
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

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('BS >>> App is listening on port ' + port);