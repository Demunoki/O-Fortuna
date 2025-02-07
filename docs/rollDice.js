import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getDatabase, ref, set,push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

   
// Initialize Firebase
const firebaseConfig = {
    // Your Firebase config goes here
    apiKey: "AIzaSyD_Hekd7W6D1xbLNphSIldTC1bGRtRCqaI",
    authDomain: "o-fortuna-4e0c2.firebaseapp.com",
    projectId: "o-fortuna-4e0c2",
    storageBucket: "o-fortuna-4e0c2.firebasestorage.app",
    messagingSenderId: "964664507733",
    appId: "1:964664507733:web:eb040b550bca96394c43dc",
    databaseURL: "https://o-fortuna-4e0c2-default-rtdb.europe-west1.firebasedatabase.app"

};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app); 
const session=`${Date.now()+Math.floor(Math.random()*100)}`
const pad = (num,count) => num.toString().padStart(count, "0");
function getAdjustedDate(now) {
    if (now.getHours() < 3) {
        now.setDate(now.getDate() - 1);
    }
    
    const year = now.getFullYear().toString().slice(-2);
    const month = pad(now.getMonth() + 1,2); 
    const day = pad(now.getDate(),2);

    return `${year}-${month}-${day}`;
}
function getAdjustedTime(now){
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let i=now.getMilliseconds();
    if (h<3){h=h+24;}
    return `${pad(h,2)}:${pad(m,2)}:${pad(s,2)}:${pad(i,4)}`
}
function storeRolls(rolls) {
    const now = new Date();
    console.log("Storing rolls")
    set(ref(database, getAdjustedDate(now)+'/'+session+'/'+getAdjustedTime(now)), {
        rolls: rolls
    }).then(() => {
        console.log("Data written successfully!"+now.getTime());
    }).catch((error) => {
        console.error("Error writing data:", error);
    });
}


const diceConfig = {
    4: { numRolls: 5, targetAverage: 2.5, previous: [] },
    6: { numRolls: 5, targetAverage: 3.5, previous: [] },
    8: { numRolls: 5, targetAverage: 4.5, previous: [] },
    10: { numRolls: 5, targetAverage: 5.5, previous: [] },
    12: { numRolls: 5, targetAverage: 6.5, previous: [] },
    20: { numRolls: 5, targetAverage: 10.5, previous: [] },
    100: { numRolls: 5, targetAverage: 50.5, previous: [] }
};

export function setup() {
    for (const dieType in diceConfig) {
        const config = diceConfig[dieType];
        config.previous = Array(config.numRolls - 1).fill(config.targetAverage);
    }
}

function getARandom(dieType) {
    const config = diceConfig[dieType]
    const randomNumber = Math.floor(Math.random() * dieType) + 1;
    const average = (config.previous.reduce((a, b) => a + b, 0) + randomNumber) / config.numRolls;
    return { randomNumber, average }
}

export function rollDice(dieType) {
    const config = diceConfig[dieType];
    let { randomNumber, average } = getARandom(dieType);
    let store=`${randomNumber}`;
    if (average < config.targetAverage) {
        store=`(${randomNumber})`;
        ({ randomNumber, average } = getARandom(dieType))
        store=store+`${randomNumber}`;
    }
    store=`d${dieType}: `+store
    storeRolls(store)
    config.previous.shift()
    config.previous.push(randomNumber)
    return { randomNumber: randomNumber, config: config, average: average }
}