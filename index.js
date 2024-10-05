let globalJSON = null; // put it into class altough as lways I dont see the point :()

// top menu
function readJSON() {
    const fileInput = document.getElementsByName('storageJSON')[0];
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        // Callback
        reader.onload = function(e) {
            try {
                // Attempt to parse the JSON
                const jsonData = JSON.parse(e.target.result);
                // Now `jsonData` holds JSON as a JavaScript object or array
                //console.log(jsonData); 
    
                //sessionStorage.setItem('jsonData', JSON.stringify(jsonData));
                globalJSON = jsonData
                //console.log(globalJSON);
                displayItems(globalJSON)
            } catch (err) {
                console.error('Hiba:', err);
                alert('Formátum nem jó vagy a fájlt valaki elbaszta.');
            }
        };
        
        // Start reading the file as text after it got processed
        reader.readAsText(file);
    } else {
        alert('Nincs fájl kiválasztva.');
    }
}
// top menu end


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

//download
function downloadJSON() {
    // Convert JSON data to a string
    const jsonString = JSON.stringify(globalJSON, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Leltár.json'; // Specify the name of the file

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);
    link.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(link); // Clean up

}

//download end