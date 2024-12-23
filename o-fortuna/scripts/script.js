const diceConfig = {
    4: { numRolls: 5, targetAverage: 2.5,previous:[] },
    6: { numRolls: 5, targetAverage: 3.5,previous:[] },
    8: { numRolls: 5, targetAverage: 4.5,previous:[] },
    10: { numRolls: 5, targetAverage: 5.5,previous:[] },
    12: { numRolls: 5, targetAverage: 6.5 ,previous:[]},
    20: { numRolls: 5, targetAverage: 10.5,previous:[] },
    100: { numRolls: 5, targetAverage: 50.5,previous:[] }
};

function getARandom(dieType) {
    const config=diceConfig[dieType]
    const randomNumber = Math.floor(Math.random() * dieType) + 1;
    const average=(config.previous.slice(1).reduce((a, b) => a + b, 0)+randomNumber)/config.numRolls;
    return {randomNumber,average}
}

function rollDice(dieType) {
    const config = diceConfig[dieType];
    let {randomNumber, average}=getARandom(dieType)
    if(average<config.targetAverage){
        ({randomNumber, average}=getARandom(dieType))
    }
    config.previous.shift()
    config.previous.push(randomNumber)
    return randomNumber;
}

const Method = {
    label: "O Fortuna!",
    interactive: false,
    handler: term => rollDice(term.faces)
}

Hooks.once("init", () => {
    
    for (const dieType in diceConfig) {
        const config = diceConfig[dieType];
        config.previous = Array(config.numRolls).fill(config.targetAverage);
    }

    CONFIG.Dice.fulfillment.methods["o-fortuna"] = Method
})