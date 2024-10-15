// dispaly
function displayItems(globalJSON){

    const displayTable = document.getElementById('displayTable');
    displayTable.innerHTML = '';

    globalJSON.items.forEach(item => {
         //console.log(item)
         // Create a new row (tr)
         const newRow = document.createElement('tr');

         // Create the ID cell (td)
         const idCell = document.createElement('td');
         idCell.textContent = item.id;

         // Create the name cell (td)
         const idName = document.createElement('td');
         idName.textContent = item.name;
 
         // Create the Quantity cell (td)
         const quantityCell = document.createElement('td');
         quantityCell.textContent = item.quantity;
 
         // Append the cells to the row
         newRow.appendChild(idCell);
         newRow.appendChild(idName);
         newRow.appendChild(quantityCell);
 
         // Append the row to the table body
         displayTable.appendChild(newRow);

    });
}
// display end




//intake
function intakeJS(event)
{
    // Stops default fucntion so global variable does not get wiped
    event.preventDefault();
    // First get a reference to the input element Azonosító 0-1-2-3-4-5
    const itemIdInput = document.getElementById('intakeItemInputId');
    // Then, get the value from the input
    const itemIdValue = parseInt(itemIdInput.value, 10);
    //console.log(itemIdValue)

    // Mennyiség
    const quantityInputId = document.getElementById('intakeQuantityInputId');
    const quantityValue = parseInt(quantityInputId.value, 10);
    //console.log(quantityValue)

    globalJSON.items[itemIdValue].quantity += quantityValue;
    displayItems(globalJSON);

}


// intake end




















//expend
function expendJS(event)
{

    // Stops default fucntion so global variable does not get wiped
    event.preventDefault();
    // First get a reference to the input element Azonosító 0-1-2-3-4-5
    const itemIdInput = document.getElementById('expendItemInputId');
    // Then, get the value from the input
    const itemIdValue = parseInt(itemIdInput.value, 10);
    //console.log(itemIdValue)

    // Mennyiség
    const quantityInputId = document.getElementById('expendQuantityInputId');
    const quantityValue = parseInt(quantityInputId.value, 10);
    //console.log(quantityValue)

    globalJSON.items[itemIdValue].quantity -= quantityValue;
    displayItems(globalJSON);

}

//expend end