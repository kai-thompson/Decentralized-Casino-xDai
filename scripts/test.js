function test(val) {
    let sum = 0;
    let exp = 8;

    for(let i = 0; i < 8; i++) {
        let fraction = val / (2 ** exp);
        sum += fraction;
        exp--;
    }

    console.log(sum);
}

test(1000);