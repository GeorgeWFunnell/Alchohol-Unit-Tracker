import { loadErrorPage } from './template_loading.js';

export async function addDrinkInfo() {
  // Gets the information required to make a record
  const drinkName = document.querySelector('#inputBox').value;
  const quantity = document.querySelector('#quantity').value;
  let drink = await fetch('find/' + drinkName);
  drink = await drink.json();
  // Checks the drink exists and that the user inputted a quantity
  if (drink === undefined || quantity < 1 || quantity === undefined) {
    loadErrorPage('ErrorP');
  }
  // adjusts unit count depending on size of shot and adds the drink
  if (document.querySelector('#Single').checked) {
    await fetch('add/' + drink.ID + '/' + quantity + '/' + drink.Price);
  } else if (document.querySelector('#Double').checked) {
    await fetch('add/' + drink.ID + '/' + quantity * 2 + '/' + drink.Price * 2);
  } else {
    loadErrorPage('ErrorP');
  }
}
