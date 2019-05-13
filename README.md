# Budgestory
Budgestory allows users to categorize their incomes and expenses. Categories can be created and sub categories can be nested within each other any number of times. Users can then navigate their finances by clicking on categories on a pie chart, which will render the subcategories of the chosen category. Each category will display the total value of all expenses of any category within that category. Users can view records by date and compare weeks and months to one another.

Created By:

* [Brendan Lee](https://github.com/boksul)
* [Hao Jiang](https://github.com/HaoJiang0201)
* [Nick Newburg](https://github.com/nnewburg)

## Tech Stack
* Express
* React
* Postgres


## Prerequisites
In order to run this project node.js and npm both need to have been installed.

## Deployment
<ol>
<li>Clone this repo</li>
<li>npm install within the main directory</li>
<li>npm install within the client directory</li>
<li>From the command line run knex migrate:latest</li>
<li>From the command line run knex seed:run</li>
<li>Run npm run start from the main directory</li>
<li>Run npm run start from the client directory</li>
<li>Visit http://localhost:3000/</li>
</ol>

## Navigating the application

After seeding the database the categories will be managed from the categories page. The root categories Incomes and Expenses cannot be edited or deleted, new categories or records can also not be created on this level. Double click on Incomes or Expenses to be enabled to begin making new categories.

## Screenshots

![Screenshot of Budgestory](https://github.com/nnewburg/finalSkeleton/blob/master/assets/Screenshot%20from%202019-05-13%2003-20-58.png?raw=true)
![Screenshot of Budgestory](https://github.com/nnewburg/finalSkeleton/blob/master/assets/Screenshot%20from%202019-05-13%2003-21-30.png?raw=true)
![Screenshot of Budgestory](https://github.com/nnewburg/finalSkeleton/blob/master/assets/Screenshot%20from%202019-05-13%2003-23-03.png?raw=true)
![Screenshot of Budgestory](https://github.com/nnewburg/finalSkeleton/blob/master/assets/Screenshot%20from%202019-05-13%2003-30-12.png?raw=true)

## Built With
* [React]
* [Express]
* [React-Router]
* [Axios]
* [React-Bootstrap]
* [React-date-picker]
* [Highcharts]
* [Highcharts-drilldown]
* [Highcharts-react]
* [Knex]
* [Post-Gres]

