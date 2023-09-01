import express from 'express';
import * as db from './database.js';

const app = express();

app.use(express.static('app', { extensions: ['html'] }));

// Allows for the use of async functions with Express
function asyncWrap(func) {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

// Gets the drink name from a fetch and returns a object of drink object
async function findDrink(req, res) {
  const drinkName = req.params.name;
  res.json(await db.findDrink(drinkName));
}

// Accepts params from drinks.js and adds the information to history
async function addDrink(req, res) {
  const drinkID = req.params.ID;
  const quantity = req.params.quantity;
  const price = req.params.price;
  await db.addDrinkToRecord(drinkID, quantity, price);
  res.sendStatus(200);
}

// Returns the full drink history
async function returnFullRecord(req, res) {
  res.json(await db.returnFullRecord());
}

async function combineDrinkNameID(req, res) {
  res.json(await db.combineDrinkNameID());
}

// Returns the full drink database
async function returnDatabase(req, res) {
  res.json(await db.returnDatabase());
}

// Server routes
app.get('/find/:name', asyncWrap(findDrink));
app.get('/add/:ID/:quantity/:price', asyncWrap(addDrink));
app.get('/fulldatabase', asyncWrap(returnDatabase));
app.get('/fullrecord', asyncWrap(returnFullRecord));
app.get('/combineDrink', asyncWrap(combineDrinkNameID));

app.listen(8081);
console.log('Server listening on port 8081');
