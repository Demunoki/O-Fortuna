setup()

function iRollDice(dieType) {
    result=rollDice(dieType)
    document.getElementById('total').innerHTML=`<strong> ${result.randomNumber}</strong>`
    document.getElementById('individualResults').innerHTML = 
    `<strong>Last ${result.config.numRolls} Numbers:</strong> ${result.config.previous.join(', ')} <br> <strong>Average:</strong> ${result.average.toFixed(2)}`;}
