// // Initialize Firebase
// const firebaseConfig = {
//     // Your Firebase config goes here
//     apiKey: "AIzaSyD_Hekd7W6D1xbLNphSIldTC1bGRtRCqaI",
//     authDomain: "o-fortuna-4e0c2.firebaseapp.com",
//     projectId: "o-fortuna-4e0c2",
//     storageBucket: "o-fortuna-4e0c2.firebasestorage.app",
//     messagingSenderId: "964664507733",
//     appId: "1:964664507733:web:eb040b550bca96394c43dc",
//     databaseURL: "https://o-fortuna-4e0c2-default-rtdb.europe-west1.firebasedatabase.app"
 
//   };

//    const app = firebase.initializeApp(firebaseConfig);

//   const database = firebase.database();
  
  
//   // Store data
  
//   const generatedNumbers = [12, 34, 56];
  
//   database.ref('numbers').set(generatedNumbers);
  
  
//   // Retrieve data
  
//   database.ref('numbers').get().then((snapshot) => {
  
//     const data = snapshot.val();
  
//     console.log(data); // Output: [12, 34, 56]
  
//   });
  





// Object to store dice counts and their sides
const diceCounts = {
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
    d100: 0
};

// Adjust dice count based on the "+" or "-" buttons
function adjustDiceCount(die, change) {
    const inputField = document.getElementById(`${die}Count`);
    let newValue = parseInt(inputField.value, 10) + change;
    if (newValue < 0) newValue = 0; // Minimum count is 0
    inputField.value = newValue;
    diceCounts[die] = newValue;
}

// Adjust constant bonus with "+" or "-" buttons
function adjustBonus(change) {
    const bonusField = document.getElementById("bonus");
    let newValue = parseInt(bonusField.value, 10) + change;
    bonusField.value = newValue;
}

// Validate the dice count when manually typed
function validateDiceCount(die) {
    const inputField = document.getElementById(`${die}Count`);
    let value = parseInt(inputField.value, 10);
    if (isNaN(value) || value < 0) value = 0; // Ensure valid non-negative number
    inputField.value = value;
    diceCounts[die] = value;
}

// Validate bonus field when manually typed
function validateBonus() {
    const bonusField = document.getElementById("bonus");
    let value = parseInt(bonusField.value, 10);
    if (isNaN(value)) value = 0; // Default to 0 if invalid
    bonusField.value = value;
}

// Roll all dice and display the results
function rollAllDice() {
    const individualResultsDiv = document.getElementById("individualResults");
    const totalDiv = document.getElementById("total");

    let total = 0;
    let individualResults = [];

    // Roll each die type based on its count
    for (const die in diceCounts) {
        const count = diceCounts[die];
        const sides = parseInt(die.slice(1), 10); // Extract number of sides from "dX"
        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            individualResults.push(`${roll}/${sides}`);
            total += roll;
        }
    }

    // Add bonus to the total
    const bonus = parseInt(document.getElementById("bonus").value, 10) || 0;
    
    if (bonus >0) {individualResults.push(`${bonus}`);}

    total += bonus;

    // Update the results display
    individualResultsDiv.innerHTML = individualResults.join(" + ");
    totalDiv.textContent = `Total: ${total}`;
}


const advancedModeToggle = document.getElementById('advanced-mode-toggle');
let advancedMode = false;

advancedModeToggle.addEventListener('click', () => {
  advancedMode = !advancedMode;
  advancedModeToggle.textContent = `Advanced Mode: ${advancedMode ? 'On' : 'Off'}`;
  // Add code here to toggle advanced mode features
});