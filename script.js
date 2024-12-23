const diceConfig = {
    4: { numRolls: 5, targetAverage: 2.5,previous:[] },
    6: { numRolls: 5, targetAverage: 3.5,previous:[] },
    8: { numRolls: 5, targetAverage: 4.5,previous:[] },
    10: { numRolls: 5, targetAverage: 5.5,previous:[] },
    12: { numRolls: 5, targetAverage: 6.5 ,previous:[]},
    20: { numRolls: 5, targetAverage: 10.5,previous:[] },
    100: { numRolls: 5, targetAverage: 50.5,previous:[] }
};


for (const dieType in diceConfig) {
    const config = diceConfig[dieType];
    config.previous = Array(config.numRolls).fill(config.targetAverage);
}

function rollDice(dieType) {
    const config = diceConfig[dieType];
    let randomNumber;
    let average;

    // Continue generating random numbers until the average is above the target
    do {
        randomNumber = Math.floor(Math.random() * dieType) + 1;
        average=(config.previous.reduce((a, b) => a + b, 0)+randomNumber)/config.numRolls;
        // If the average is below the target, reroll
    } while (average < config.targetAverage);
    config.previous.shift()
    config.previous.push(randomNumber)
    document.getElementById('total').innerHTML=`<strong> ${randomNumber}</strong>`
    document.getElementById('individualResults').innerHTML = 
    `<strong>Last ${config.numRolls} Numbers:</strong> ${config.previous.join(', ')} <br> <strong>Average:</strong> ${average.toFixed(2)}`;}