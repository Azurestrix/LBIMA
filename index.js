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

         // Create intake for current item cell 
         const intakeCell = document.createElement('td');
         const intakeInput = document.createElement('input');
         intakeInput.classList.add('intakecell');
         intakeInput.setAttribute('type', 'number');
         intakeInput.setAttribute('data-id', item.id);
         intakeInput.addEventListener('blur', function(event)
        {
                intakeJS(event);
        });
         intakeCell.appendChild(intakeInput);

        
         // Create expend for current item cell 
         const expendCell = document.createElement('td');
         const expendInput = document.createElement('input'); 
         expendInput.classList.add('expendcell');
         expendInput.setAttribute('type', 'number'); 
         expendInput.setAttribute('data-id', item.id);
         expendInput.addEventListener('blur', function(event)
        {
                expendJS(event);
        });
         expendCell.appendChild(expendInput);

         // Create change value to
         const changeCell = document.createElement('td');
         const changeInput = document.createElement('input');
         changeInput.classList.add('changecell');
         changeInput.setAttribute('type', 'number');
         changeInput.setAttribute('data-id', item.id);
         changeInput.addEventListener('blur', function(event)
         {
            changeJS(event);
         });
         changeCell.appendChild(changeInput);

 
         // Append the cells to the row  --
         newRow.appendChild(idCell);
         newRow.appendChild(idName);
         newRow.appendChild(quantityCell);
         newRow.appendChild(intakeCell);
         newRow.appendChild(expendCell);
         newRow.appendChild(changeCell);




 
         // Append the row to the table body
         displayTable.appendChild(newRow);

    });
}
// display end
















//intake

function intakeJS(event)
{
    // Get the data-id
    const currentEvent = event.target;
    const currentEventData = currentEvent.getAttribute('data-id');

    // Get the quantity
    const itemQuantity = parseInt(currentEvent.value, 10)
    //console.log(itemQuantity)
    //console.log(currentEventData)

    if (!isNaN(itemQuantity))
        {
            // Update data
            globalJSON.items[currentEventData].quantity += itemQuantity;

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // Get YYYY-MM-DD

            // Write transaction object
            transactionItem = 
            {
                itemID: currentEventData,
                name: globalJSON.items[currentEventData].name,
                timestamp: formattedDate,
                quantity: itemQuantity,
                type: 'in'
            }

            // Write to transactions array
            globalJSON.transactions.push(transactionItem); 
            
            //console.log(transactionItem)

            displayItems(globalJSON);
        }
    else{}
}
// intake end





































//expend
function expendJS(event)
{
    // Get the data-id
    const currentEvent = event.target;
    const currentEventData = currentEvent.getAttribute('data-id');

    // Get the quantity
    const itemQuantity = parseInt(currentEvent.value, 10)
    //console.log(itemQuantity)
    //console.log(currentEventData)


    if (!isNaN(itemQuantity))
        {

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // Get YYYY-MM-DD

            // Write transaction object
            transactionItem = 
            {
                itemID: currentEventData,
                name: globalJSON.items[currentEventData].name,
                timestamp: formattedDate,
                quantity: itemQuantity,
                type: 'out'
            }

            // Write to transactions array
            globalJSON.transactions.push(transactionItem); 


            globalJSON.items[currentEventData].quantity -= itemQuantity;
            displayItems(globalJSON);
        }
    else{}

    

}
//expend end




//change

function changeJS(event)
{
    // Get the data-id
    const currentEvent = event.target;
    const currentEventData = currentEvent.getAttribute('data-id');

    // Get the quantity
    const itemQuantity = parseInt(currentEvent.value, 10)
    //console.log(itemQuantity)
    //console.log(currentEventData)


    if (!isNaN(itemQuantity))
        {

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // Get YYYY-MM-DD

            // Write transaction object
            transactionItem = 
            {
                itemID: currentEventData,
                name: globalJSON.items[currentEventData].name,
                timestamp: formattedDate,
                quantity: itemQuantity,
                type: 'change'
            }

            // Write to transactions array
            globalJSON.transactions.push(transactionItem); 

            globalJSON.items[currentEventData].quantity = itemQuantity;
            displayItems(globalJSON);
        }
    else{}
}


//change end





















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

    // Reload page so no variables will conflict
    window.location.reload(true);

}

//download end