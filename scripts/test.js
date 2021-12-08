function test(size) {
    let pot = 100;
    let sum =0
    i = 0

    while(pot > 0) {
        if(i > 100) return "passed"
        let betSize = 100 / size
        pot += betSize * 0.025
        betSize -= betSize * 0.025
        if(getRandomInt(2) === 1) {
            pot -= betSize
            sum++
            i++
        }else {
            pot += betSize
            sum++
            i++
        }
    }
    return "failed"

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
}

function check() {
    console.log("Loading...")
    bet = 0;
    index = 0
    j = 0

    while(true) {
        if(index === 100000) {
            if(j === index) return bet;
            console.log(`Bet value ${bet} failed. ${j/index * 100}% passed or ${Math.floor((1 - j/index) * 100000)}/100000 failed. Moving on...`)
            bet++; 
            index = 0;
            j = 0
        }
        if(test(bet) === "passed") {
            j++
        }
        index++;
    }
}

console.log(check())

//results= 68
 