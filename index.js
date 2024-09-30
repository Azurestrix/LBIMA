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
                console.log(jsonData); 
                
                localStorage.setItem('jsonData', JSON.stringify(jsonData));
            } catch (err) {
                console.error('Hiba:', err);
                alert('Formátum nem jó.');
            }
        };
        
        // Start reading the file as text after it got processed
        reader.readAsText(file);
    } else {
        alert('Nincs fájl kiválasztva.');
    }
}

function workWithJSON(data) {
    // Example function to work with JSON data
    // Here you can do anything with your JSON data
    console.log('Working with JSON:', data);
    // Perhaps you want to display it, analyze it, etc.
    // For instance:
    // document.getElementById('displayArea').innerText = JSON.stringify(data, null, 2);
}