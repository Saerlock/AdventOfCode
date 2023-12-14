import { readFileSync } from 'fs';

const readInput = (fileName) => {
	return readFileSync(fileName, "utf8");
};



// Types
type Map = number[][];



// Part 1
function decode(number: number, map: Map) : number {
    const line = map.filter((line) => number >= line[1] && number < line[1] + line[2])[0];

    return line ? number + (line[0] - line[1]) : number;
}

function decodeAlmanac(input: string) : number {
    const inputTable: string[] = input.split('\n\n')

    const inputNumbers: number[] = inputTable[0].split(': ')[1].split(' ').map((char) => parseInt(char));
    inputTable.shift();

    const maps: Map[] = inputTable.map((map) => map.split(':')[1].split('\n').filter((char) => char.length > 0).map((line) => line.split(' ').map((char) => parseInt(char))));

    for (let i = 0; i < inputNumbers.length; i++) {
        for (let j = 0; j < maps.length; j++) {
            inputNumbers[i] = decode(inputNumbers[i], maps[j])
        }
    }

    return inputNumbers.reduce((x, y) => x > y ? y : x);
}



// Part 2
function encode(number: number, map: Map) : number {
    const line = map.filter((line) => number >= line[0] && number < line[0] + line[2])[0];

    return line ? number + (line[1] - line[0]) : number;
}

function decodeAlmanacRange(input: string) : number {
    const inputTable: string[] = input.split('\n\n');

    const inputRange: number[] = inputTable[0].split(': ')[1].split(' ').map((char) => parseInt(char));
    inputTable.shift();

    const inputRanges: {start: number, end: number}[] = [];

    for (let i = 0; i < inputRange.length; i+=2) {
        inputRanges.push({start: inputRange[i], end: inputRange[i] + inputRange[i+1] - 1});
    }

    const maps: Map[] = inputTable.map((map) => map.split(':')[1].split('\n').filter((char) => char.length > 0).map((line) => line.split(' ').map((char) => parseInt(char))));

    const maxNumber = inputRanges.reduce((x, y) => x < y.end ? y.end : x, 0);

    let lowest = 0;

    while (lowest <= maxNumber) {
        let cpyLowest = lowest;

        for (let j = maps.length - 1; j >= 0; j--) {
            cpyLowest = encode(cpyLowest, maps[j])
        }

        for (const range of inputRanges) {
            if (cpyLowest >= range.start && cpyLowest <= range.end) return lowest;
        }

        lowest++;
    }

    return -1;
}



// Tests
const txtTest: string = 'seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4\n';
// console.log(txtTest);
// decodeAlmanacRange(txtTest)
let start: number;

start = Date.now();
console.log(`Test 1: ${decodeAlmanac(txtTest)} should be equal to 35 | ${(Date.now() - start)}ms\n`);

start = Date.now();
console.log(`Test 2: ${decodeAlmanacRange(txtTest)} should be equal to 46 | ${(Date.now() - start)}ms\n`);

// Prod
const txtProd = readInput('inputs/day5.txt');

start = Date.now();
console.log(`Prod 1: ${decodeAlmanac(txtProd)} | ${(Date.now() - start)}ms\n`);

start = Date.now();
console.log(`Prod 2: ${decodeAlmanacRange(txtProd)} | ${(Date.now() - start)}ms\n`);
