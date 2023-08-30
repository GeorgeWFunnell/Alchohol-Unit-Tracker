import { addDrinkInfo } from './drinks.js'

// Sets up event listeners for the hamburger menu which only needs to be done once
function setUp() {
    loadMainMenu();
    document.querySelector("#hamburger").addEventListener("click", loadHamburger);
    document.querySelector("#Home").addEventListener("click", loadMainMenu);
    document.querySelector("#TrackedUnits").addEventListener("click", loadTrackingPage);
    document.querySelector("#InputDrinks").addEventListener("click", loadEditMenu);
    document.querySelector("#DrinkDatabase").addEventListener("click", loadDatabasePage);
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
    clearBody("#pageArea");
    const newContent = newPage.content.cloneNode(true);
    document.querySelector("#pageArea").appendChild(newContent);
}

// Opens or Closes the hamburger menu
function loadHamburger() {
    const menu = document.querySelector("#MyLinks");
    if (menu.classList.contains("inactive")) {
        menu.classList.remove("inactive");
    } else {
        menu.classList.add("inactive");
    }
}

// Prints the database onto the page
async function showDatabaseInfo() {
    clearBody(".informationArea");
    const div = document.querySelector(".informationArea");
    let database = await fetch("fulldatabase");
    database = await database.json();
    for (let drink of database) {
        const drinkInfo = document.createElement("p");
        drinkInfo.textContent = JSON.stringify(drink);
        div.append(drinkInfo);
    }
}

// Prints drink history onto the page
async function showDrinkHistory() {
    clearBody(".informationArea");
    const div = document.querySelector(".informationArea");
    let history = await fetch("fullrecord");
    history = await history.json();
    for (let drink of history) {
        const drinkInfo = document.createElement("p");
        drinkInfo.textContent = JSON.stringify(drink);
        div.append(drinkInfo);
    }
}

// Updates values on main page and configures buttons
function loadMainMenu() {
    loadPage("MenuP");
    document.querySelector("#AUnit").textContent = "46";
    document.querySelector("#BALevel").textContent = "688%";
    document.querySelector("#Price").textContent = "£11.70";
    document.querySelector("#editB").addEventListener("click", loadEditMenu);
    document.querySelector("#moreB").addEventListener("click", loadDatabasePage);
    document.querySelector("#awareB").addEventListener("click", loadDrinkAware);
}

// Displays drink history
async function loadTrackingPage() {
    loadPage("TrackP");
    await showDrinkHistory();
}

// Loads the menu to allow adding to the drink record
function loadEditMenu() {
    loadPage("EditDrinkP");
    document.querySelector("#buttonA").addEventListener("click", addDrinkInfo);
}

// Displays the full Drink Database
async function loadDatabasePage() {
    loadPage("DatabaseP");
    await showDatabaseInfo();
}

// Sends user to the drink aware website
function loadDrinkAware() {
    window.location.assign("https://www.drinkaware.co.uk/")
}

// Basic error page that can be called by other functions if some error occurs
export function loadErrorPage() {
    loadPage("ErrorP");
}

window.addEventListener("load", setUp);