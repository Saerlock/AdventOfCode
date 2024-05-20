import { readFileSync } from 'fs';

const readInput = (fileName) => {
	return readFileSync(fileName, "utf8");
};



// Part 1

function allSame(line: number[]): boolean {
	if(line.length === line.filter((x) => x === line[0]).length) return true;
	return false;
}

function predictNextValue(line: string[]) : number {
	let nextValue = 0;
	let currentLine = line.map(x => parseInt(x));

	while(!allSame(currentLine)) {
		nextValue += currentLine[currentLine.length-1];

		const newLine: number[] = [];
		for (let i = 0; i < currentLine.length - 1; i++) {
			newLine.push(currentLine[i+1] - currentLine[i])
		}

		currentLine = newLine;
	}

	return nextValue + currentLine[0];
}

function sumOfNextValues(lines: string) : number {
	return lines.trim().split('\n')
		.map((line) => predictNextValue(line.split(' ')))
		.reduce((x, y) => x + y);
}

// Part 2



// Tests
const txtTest1: string = '0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45\n';
let start: number;

start = Date.now();
console.log(`Test 1: ${sumOfNextValues(txtTest1)} should be equal to 114 | ${(Date.now() - start)}ms\n`);

// start = Date.now();
// console.log(`Test 2: ${b(txtTest1)} should be equal to  | ${(Date.now() - start)}ms\n`);

// Prod
const txtProd = readInput('inputs/day9.txt');

start = Date.now();
console.log(`Prod 1: ${sumOfNextValues(txtProd)} | ${(Date.now() - start)}ms\n`);

// start = Date.now();
// console.log(`Prod 2: ${b(txtProd)} | ${(Date.now() - start)}ms\n`);