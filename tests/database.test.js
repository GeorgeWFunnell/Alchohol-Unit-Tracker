import * as db from '../app/database.js'

// Checks functionality of the database by requesting information on Grey Goose
test('Gets a Drink from the Database', async() => {
    const drink = await db.findDrink('Grey Goose');
    expect(drink).toEqual({ 'ID': 3, 'name': 'Grey Goose', 'type': 'Vodka', 'Units': 1, 'Alc_Perc': 40, 'Price': 20 })
})

// Checks ability to add to the drink record
test('Adds a Drink to the History', async() => {
    await db.addDrinkToRecord(999, 999, 999);
    const history = await db.returnFullRecord();
    const testID = history[history.length - 1];
    expect(testID.Drink_ID).toBe("999");
})

// Removes the test drink from the record
test('Remove a Drink from History', async() => {
    const history = await db.returnFullRecord();
    const lastEntry = history[history.length - 1];
    await db.removeDrinkFromRecord(lastEntry.ID);
    const newHistory = await db.returnFullRecord();
    const newLastEntry = newHistory[newHistory.length - 1];
    expect(newLastEntry).not.toEqual(lastEntry);
})