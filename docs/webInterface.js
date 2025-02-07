import * as rollDice from "./rollDice.js"
rollDice.setup()
 window.iRollDice=function iRollDice(dieType) {
    let result = rollDice.rollDice(dieType)
    document.getElementById('total').innerHTML = `<strong> ${result.randomNumber}</strong>`
    document.getElementById('individualResults').innerHTML =
        `<strong>Last ${result.config.numRolls} Numbers:</strong> ${result.config.previous.join(', ')} <br> <strong>Average:</strong> ${result.average.toFixed(2)}`;
}
