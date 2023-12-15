import { readFileSync } from 'fs';

const readInput = (fileName) => {
	return readFileSync(fileName, "utf8");
};



// Part 1
function result(input: number, modif: number) {
    return Math.floor(input/2 - modif) * Math.ceil(input/2 + modif);
}

function waysToWin(input: string) : number {
    const inputTable = input.split('\n').map((x) => x.split(' ').map((x) => parseInt(x)).filter((y) => !isNaN(y)));
    inputTable.pop();

    const waysToBeat: number[] = [];

    for (let i = 0; i < inputTable[0].length; i++) {
        waysToBeat.push(0);

        let j = 0;
        
        while (result(inputTable[0][i], j) > inputTable[1][i]) {
            waysToBeat[i]++;
            j++;
        }

        inputTable[0][i]%2 === 0 ? waysToBeat[i] = waysToBeat[i] * 2 - 1 : waysToBeat[i] *= 2
    }

    return waysToBeat.reduce((x, y) => x * y, 1);
}




// Part 2
function waysToWinOne(input: string) : number {
    const inputTable = input.split('\n').map((x) => x.split(' ').map((x) => parseInt(x)).filter((y) => !isNaN(y)).reduce((x, y) => x + y.toString(), '')).map((x) => parseInt(x));
    inputTable.pop();

    let waysToBeat: number = 0;

    let j = 0;
        
    while (result(inputTable[0], j) > inputTable[1]) {
        waysToBeat++;
        j++;
    }

    inputTable[0]%2 === 0 ? waysToBeat = waysToBeat * 2 - 1 : waysToBeat *= 2

    return waysToBeat;
}




// Tests
const txtTest: string = 'Time:      7  15   30\nDistance:  9  40  200\n';
// console.log(txtTest);
// waysToWinOne(txtTest);
let start: number;

start = Date.now();
console.log(`Test 1: ${waysToWin(txtTest)} should be equal to 288 | ${(Date.now() - start)}ms\n`);

start = Date.now();
console.log(`Test 2: ${waysToWinOne(txtTest)} should be equal to 71503 | ${(Date.now() - start)}ms\n`);

// // Prod
const txtProd = readInput('inputs/day6.txt');

start = Date.now();
console.log(`Prod 1: ${waysToWin(txtProd)} | ${(Date.now() - start)}ms\n`);

start = Date.now();
console.log(`Prod 2: ${waysToWinOne(txtProd)} | ${(Date.now() - start)}ms\n`);
