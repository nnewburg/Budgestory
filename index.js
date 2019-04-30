/******** Server-Side Initialization and Moduels, Libraries Required ********/ 
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

// Vaz Example Codes
{
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
}

/******** Public Objects and Arrays ********/ 
let balanceObj = {};
let allCategories = [];
let allRecords = [];
let balanceChart = {};
let timePeriod = {start: "1000-01-01", end: "9999-12-31"};

/******** Public Functions ********/
// Initialize the top category: balance
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
// If a specific category has record/records inside
function hasRecordIn(categoryObj) {
  let hasRecord = false;
  if(allRecords.length > 0) {
    allRecords.map(record => {
      if(record.category_id === categoryObj.id) {
        hasRecord = true;
      }
    });
  }
  if(!hasRecord) {
    if(allCategories.length > 0) {
      allCategories.map(category => {
        if(category.parent_id === categoryObj.id) {
          if(hasRecord === false) {
            // categoryObj.hasRecord = hasRecordIn(category);
            hasRecord = hasRecordIn(category);
          }
        }
      });
    }
  } 
  return hasRecord;
}
// Transfer db json style into highcharts data style
function transferToChart() {
  // For the "series" key's value
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
  // For the "drilldown" key's value
  if(allCategories.length > 0) {
    allCategories.map(category => {
      if(hasRecordIn(category)) {
        createSeriesObj(category);
      }
    });
  }
}
// Generate children data for a specific serie (category)
function createChildrenData(categoryObj) {
  let childrenArray = [];
  let childrenObj = {};
  if(allCategories.length > 0) {
    allCategories.map(category => {
      if(category.parent_id === categoryObj.id && hasRecordIn(category)) {
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
        childrenObj.d = record.date.split('T')[0];
        childrenObj.drilldown = null;
        childrenArray.push(childrenObj);
      }
    });
  }
  return childrenArray;
}
// Generate a series for each category and push it into drilldown structure
function createSeriesObj(categoryObj) {
  let seriesObj = {};
  seriesObj.name = categoryObj.name;
  seriesObj.id = categoryObj.id;
  seriesObj.data = createChildrenData(categoryObj);
  balanceChart.drilldown.series.push(seriesObj);
}
// Find all children categories and records for a specific category
function findAllChildren(categoryObj) {
  let children = [];
  if(allCategories.length > 0) {
    allCategories.map(category => {
      if(category.parent_id === categoryObj.id) {
        category.type = "category";
        category.value = 0;
        // category.hasRecord = false;
        category.children = findAllChildren(category);
        children.push(category);
      }
    });
  }
  if(allRecords.length > 0) {
    allRecords.map(record => {
      if(record.category_id === categoryObj.id) {
        record.type = "record";
        record.children = [];
        children.push(record);
      }
    });
  }
  return children;
}
// Calculate the value for a specific category based on all the records inside of it
function calculateValue(categoryObj) {
  let valueTotal = 0;
  if(allCategories.length > 0) {
    allCategories.map(category => {
      if(category.parent_id === categoryObj.id) {
        let valueAdd = calculateValue(category);
        category.value += valueAdd;
        if(categoryObj.id === 0 && category.id === 1) {
          valueAdd *= -1;
        }
        valueTotal += valueAdd;
      }
    });
  }
  if(allRecords.length > 0) {
    allRecords.map(record => {
      if(record.category_id === categoryObj.id) {
        valueTotal += record.value;
      }
    });
  }
  return valueTotal;
}
// Update Date Range
function updateDateRange(dateParams) {
  if(Object.keys(dateParams).length > 0) {
    if(dateParams.start){
      timePeriod.start = dateParams.start;
    }
    if(dateParams.end){
      timePeriod.end = dateParams.end;
    }
  }
  // console.log("BS >>> timePeriod = ", timePeriod);
}

/******** All HTTP Requires Based On Express ********/
// Home Page: Achieve data from DB, regulate into hightchart style, and then send back to the front
app.get('/api/HomeChart', (req,res) => {
  // Update Date Range
  updateDateRange(req.query);
  // Select all Categories
  knex('categories').select()
  .then(categories => {
    return Promise.all(JSON.parse(JSON.stringify(categories)));
  })
  .then(results => {
    allCategories = results;
    // Select all Records
    knex('records').select().where('date', '>=', timePeriod.start).andWhere('date', '<=', timePeriod.end)
    .then(records => {
      allRecords = JSON.parse(JSON.stringify(records));
      balanceInitialization();
      balanceObj.children = findAllChildren(balanceObj);
      balanceObj.value += calculateValue(balanceObj);
      transferToChart();
      // console.log("balanceChart.series = ", balanceChart.series);
      // console.log("balanceChart.drilldown = ", balanceChart.drilldown);
      res.json(balanceChart);
    })
    .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
});
// Categories Management Page: 
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
    res.json({ data: results });
  })
});

app.post('/newCategory', (req,res) => {
  knex('categories').insert([{name: req.body.newCat.name, parent_id: req.body.newCat.parent_id}])
  .then(result =>
    {res.redirect('/categories')}
  )
});

app.post('/newRecord', (req,res) => {
  knex('records').insert([{user_id: 1, notes: req.body.newRec.notes, category_id: req.body.newRec.category_id, value: req.body.newRec.value}])
  .then(result =>
    {res.redirect('/categories')}
  )
});
  
app.get('/api/getRecords', (req,res) => {
  knex.select().from('records')
  .then((results) => {
    res.json({
      data: results
    });
  })
});
  
app.post('/newCategory', (req,res) => {
  // console.log(req.body)
  knex('categories').insert([{name: req.body.newCat.name, parent_id: req.body.newCat.parent_id}])
  .then(result =>
    {res.redirect('/categories')}
  )
});
  
app.post('/newRecord', (req,res) => {
  // console.log(req.body)
  knex('records').insert([{user_id: 1, notes: req.body.newRec.notes, category_id: req.body.newRec.category_id, value: req.body.newRec.value}])
  .then(result =>
    {res.redirect('/categories')}
  )
});

app.get('/api/getCategoriesMenu', (req, res) => {
  knex.select().from('categories')
  .then((results) => {
    res.json({ data: results });
  })
});

app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

/******** Start Listening ********/
const port = process.env.PORT || 5000;
app.listen(port);
console.log('BS >>> App is listening on port ' + port);