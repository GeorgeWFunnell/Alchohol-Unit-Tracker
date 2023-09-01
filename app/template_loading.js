import { addDrinkInfo } from './drinks.js';


// Sets up event listeners for the hamburger menu which only needs to be done once
function setUp() {
  loadMainMenu();
  document.querySelector('#hamburger').addEventListener('click', loadHamburger);
  document.querySelector('#Home').addEventListener('click', loadMainMenu);
  document.querySelector('#TrackedUnits').addEventListener('click', loadTrackingPage);
  document.querySelector('#InputDrinks').addEventListener('click', loadEditMenu);
  document.querySelector('#DrinkDatabase').addEventListener('click', loadDatabasePage);
}

// Clears the pageArea in index.html to load another template
function clearBody(area) {
  const pageArea = document.querySelector(area);
  while (pageArea.hasChildNodes()) {
    pageArea.removeChild(pageArea.firstChild);
  }
}

// Loads the desired template onto the page
function loadPage(pageID) {
  const newPage = document.querySelector(`#${pageID}`);
  clearBody('#pageArea');
  const newContent = newPage.content.cloneNode(true);
  document.querySelector('#pageArea').appendChild(newContent);
}

// Opens or Closes the hamburger menu
function loadHamburger() {
  const menu = document.querySelector('#MyLinks');
  if (menu.classList.contains('inactive')) {
    menu.classList.remove('inactive');
  } else {
    menu.classList.add('inactive');
  }
}
/*
async function showDatabaseInfo() {
  clearBody('.informationArea');
  const div = document.querySelector('.informationArea');
  let database = await fetch('fulldatabase');
  database = await database.json();
  for (const drink of database) {
    const drinkInfo = document.createElement('p');
    drinkInfo.className = 'showTables';
    drinkInfo.textContent = JSON.stringify(drink);
    div.append(drinkInfo);
  }
}
*/

async function showDatabaseInfo() {
  clearBody('.informationArea');
  const div = document.querySelector('.informationArea');
  let database = await fetch('fulldatabase');
  database = await database.json();
  for (const drink of database) {
    const drinkInfo = createDrinkInfoElementDatabase(drink);
    div.appendChild(drinkInfo);
  }
}

/*
async function showDrinkHistory() {
  clearBody('.informationArea');
  const div = document.querySelector('.informationArea');
  let history = await fetch('fullrecord');
  history = await history.json();
  for (const drink of history) {
    const drinkInfo = document.createElement('p');
    drinkInfo.className = 'showTables';
    drinkInfo.textContent = JSON.stringify(drink);
    div.append(drinkInfo);
  }
}
*/

async function combineDrinkNameID() {
  const response = await fetch('combineDrink');
  const drinkData = await response.json();
  return drinkData;
}

async function showDrinkHistory() {
  clearBody('.informationArea');
  const div = document.querySelector('.informationArea');
  const response = await fetch('fullrecord');
  const history = await response.json();

  for (const drink of history) {
    const drinkInfo = createDrinkInfoElement(drink);
    div.appendChild(drinkInfo);
  }
}

async function createDrinkInfoElement(drink) {
  const drinkInfo = document.createElement('div');
  drinkInfo.classList.add('drinkInfo');

  const drinkData = await combineDrinkNameID();
  const matchingDrink = drinkData.find(item => item.ID === drink.Drink_ID);

  if (matchingDrink) {
    const nameLabel = document.createElement('p');
    nameLabel.textContent = `Name: ${matchingDrink.DrinkName}`;
    drinkInfo.appendChild(nameLabel);
  }

  const typeLabel = document.createElement('p');
  typeLabel.textContent = `Type: ${drink.type}`;
  drinkInfo.appendChild(typeLabel);

  const timeLabel = document.createElement('p');
  timeLabel.textContent = `Time: ${drink.TIME}`;
  drinkInfo.appendChild(timeLabel);

  const unitLabel = document.createElement('p');
  unitLabel.textContent = `Units: ${drink.Units}`;
  drinkInfo.appendChild(unitLabel);

  // Add more fields as needed

  return drinkInfo;
}

function createDrinkInfoElementDatabase(drink) {
  const drinkInfo = document.createElement('div');
  drinkInfo.classList.add('drinkInfo');

  const nameLabel = document.createElement('p');
  nameLabel.textContent = `Name: ${drink.name}`;
  drinkInfo.appendChild(nameLabel);

  const typeLabel = document.createElement('p');
  typeLabel.textContent = `Type: ${drink.type}`;
  drinkInfo.appendChild(typeLabel);

  // Add more fields as needed

  return drinkInfo;
}


// Updates values on main page and configures buttons
function loadMainMenu() {
  loadPage('MenuP');
  document.querySelector('#AUnit').textContent = '46';
  document.querySelector('#BALevel').textContent = '688%';
  document.querySelector('#Price').textContent = '£11.70';
  document.querySelector('#editB').addEventListener('click', loadEditMenu);
  document.querySelector('#moreB').addEventListener('click', loadDatabasePage);
  document.querySelector('#awareB').addEventListener('click', loadDrinkAware);
}

// Displays drink history
async function loadTrackingPage() {
  loadPage('TrackP');
  await showDrinkHistory();
}

// Loads the menu to allow adding to the drink record
function loadEditMenu() {
  loadPage('EditDrinkP');
  document.querySelector('#buttonA').addEventListener('click', addDrinkInfo);
}

// Displays the full Drink Database
async function loadDatabasePage() {
  loadPage('DatabaseP');
  await showDatabaseInfo();
}

// Sends user to the drink aware website
function loadDrinkAware() {
  window.location.assign('https://www.drinkaware.co.uk/');
}

// Basic error page that can be called by other functions if some error occurs
export function loadErrorPage() {
  loadPage('ErrorP');
}

window.addEventListener('load', setUp);
