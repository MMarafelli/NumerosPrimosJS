const BigNumber = require('bignumber.js');

//* ====================================================

let input = 7;

var confiabilidade = [];
var occurrences = [];

confiability();

if (((occurrences[false] > occurrences[true]) && (0.4 * occurrences[false]) > occurrences[true]) || occurrences[true] == undefined) {
    console.log("Composto")
} else {

    confiabilidade = [];
    occurrences = [];

    confiability();

    if (((occurrences[false] > occurrences[true]) && (0.4 * occurrences[false]) > occurrences[true]) || occurrences[true] == undefined) {
        console.log("Composto")
    } else {
        console.log("Primo")
    }
}

//* ====================================================

function confiability() {

    for (let conf = 0; conf < 11; conf++) {
        confiabilidade.push(primoounao(input));
    }

    //    console.log(confiabilidade);


    for (let i = 0, j = confiabilidade.length; i < j; i++) {
        occurrences[confiabilidade[i]] = (occurrences[confiabilidade[i]] || 0) + 1;
    }

    console.log(occurrences);
    console.log(occurrences[false]);
    console.log(occurrences[true])

}


//* ====================================================
function primoounao(input) {

    //   console.log("input = " + input);

    if (input === 2 || input === 3 || input === 5 || input === 7 || input < 2) {
        conf = 11;
        return true;
    }
    if (input % 2 == 0 || input % 3 == 0 || input % 5 == 0 || input % 7 == 0) {
        conf = 11;
        return false;
    }

    let ipuntAnterior = input - 1;

    let binarioOriginal = dec2bin(input);
    let binario = dec2bin(ipuntAnterior);

    //    console.log(binarioOriginal);
    //    console.log(binario);

    let keyArrayBin = binario.split("");

    //    console.log(keyArrayBin);
    //    console.log(keyArrayBin.length);
    //    console.log(keyArrayBin[keyArrayBin.length - 1]);

    let keyArrayBinRightZero = [];
    let zeroQuantity = 0;
    let rightZeros = true;

    for (i = keyArrayBin.length; i--;) {

        if (keyArrayBin[i] == 0 &&
            rightZeros) {
            zeroQuantity++;
        } else {
            rightZeros = false;
            keyArrayBinRightZero.push(keyArrayBin[i]);
        }
    }


    let resto = bin2dec(keyArrayBinRightZero.reverse().join(""));

    //   console.log("q = " + resto);
    //   console.log("k = " + zeroQuantity);

    let q = resto;

    for (let m = 0; m < Math.floor(input/2); m++) {
        let a = Math.floor(Math.random() * (input - 1));

        //   console.log("a = " + a);
        //    console.log('------')


        let x = new BigNumber(a);
        let y = new BigNumber(q);
        let z = new BigNumber(input);
        let calc1 = new BigNumber(0);

        calc1 = (x.pow(y)).mod(z);

        //     console.log("x.pow(y) = " + x.pow(y))
        //    console.log("calc1 = " + calc1)

        if (calc1 == 1) {
            //            console.log("aqui 1")
            return true;
        }

        for (j = 0; j < (zeroQuantity - 1); j++) {
            //        console.log("a elevado " + (a ** ((2 ** j) * q)))
            //            console.log("a elevado a " + ((a ** ((2 ** j) * q)) % input == (input - 1)))
            //            console.log('------')

            let newJ = new BigNumber(j);
            let constTwo = new BigNumber(2);

            calc1 = (x.pow((constTwo.pow(j)).times(y))).mod(z);
            //            console.log(calc1);

            //     console.log("calc1 = " + calc1)
            if ((calc1 == (input - 1))) {
                //                console.log("aqui 2")
                //                console.log('------')
                return true;
            }
        }
    }

    return false;

}


// *************************************************************************************************

function dec2bin(dec) {
    return ("00000000" + (parseInt(dec, 10)).toString(2)).substr(-8);
}


function bin2dec(bin) {
    return parseInt(bin, 2).toString(10);
}

// *************************************************************************************************
