import { open } from "sqlite";
import sqlite3 from 'sqlite3';


// A function that opens the database and makes sure its up to date
async function init() {
    const db = await open({ filename: "./app/Drink_Database.sqlite", driver: sqlite3.Database });
    await db.migrate({ migrationsPath: "./app/Migrations" });
    return db;
}

const dbConn = init();

// Finds the first drink where the name equals the users search
export async function findDrink(name) {
    const db = await dbConn;
    return db.get('SELECT * FROM Drinks WHERE name = ?', name);
}

// Adds the drink ID to the record for future reference, as well as how many units were drunk and the expected price
export async function addDrinkToRecord(Drink_ID, Units, Price) {
    const db = await dbConn;
    const TIME = await db.get("SELECT datetime('now', 'localtime') as time");
    db.run('INSERT INTO History (Time, Drink_ID, Units, Price) VALUES (?, ?, ?, ?)', TIME.time, Drink_ID, Units, Price);
}

export async function removeDrinkFromRecord(ID) {
    const db = await dbConn;
    db.run('DELETE FROM History WHERE ID = ?', ID);
}

// returns a specific drink from the record
export async function returnRecord(ID) {
    const db = await dbConn;
    return db.get('SELECT * FROM History WHERE ID = ?', ID);
}

// Returns the full drink record
export async function returnFullRecord() {
    const db = await dbConn;
    return db.all('SELECT * FROM History');
}

// Returns the full Drink Database
export async function returnDatabase() {
    const db = await dbConn;
    return db.all('SELECT * FROM Drinks');
}

// Returns how many drinks were drunk in a variable amount of days
export async function drunkInTime(timeFrame) {
    const db = await dbConn;
    const searchTime = db.get("unixepoch('now', 'localtime', '-' + timeFrame + 'days') as time)");
    const drinks = db.all('SELECT * FROM History WHERE unixepoch(Time) > ?', searchTime.time);
}