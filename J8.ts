import { readFileSync } from 'fs';

const readInput = (fileName) => {
	return readFileSync(fileName, "utf8");
};



// Types
type Move = {
    name: string,
    left: string,
    right: string
}



// Regex
const endWithA = /A$/;
const endWithZ = /Z$/;



// Functions
function findLCM(a : number, b : number) {
    let large = Math.max(a, b), small = Math.min(a, b);

    for (let i = large; ; i += large) {
        if (i % small === 0)
            return i;
    }
}



// Part 1
function howManySteps(input: string) : number {
    const inputTab = input.trim().split('\n\n');

    const instructions = inputTab[0].split('');

    const network = new Map<string, Move>();
    inputTab[1].split('\n').map((instruction) => network.set(instruction.substring(0, 3), {name: instruction.substring(0, 3), left: instruction.substring(7, 10), right: instruction.substring(12, 15)}));

    let currentPos = network.get('AAA'), nextInstruction = 0, cptMoves = 0;

    while (currentPos && currentPos.name !== 'ZZZ') {
        currentPos = network.get(instructions[nextInstruction] === 'L' ? currentPos.left : currentPos.right);
        cptMoves++;
        nextInstruction === instructions.length - 1 ? nextInstruction = 0 : nextInstruction++;    
    }

    return cptMoves;
}



// Part 2
function howManyStepsMultiple(input: string) : number {
    const inputTab = input.trim().split('\n\n');

    const instructions = inputTab[0].split('');

    const network = new Map<string, Move>();

    const currentPositions : Move[] = [];

    inputTab[1].split('\n').map((instruction) => {
        const name = instruction.substring(0, 3), left = instruction.substring(7, 10), right = instruction.substring(12, 15);
        network.set(name, {name, left, right});

        if (endWithA.test(instruction.substring(0, 3))) {
            currentPositions.push({
                name: name,
                left: left,
                right: right 
            })
        }
    });

    const moveCounters: number[] = []

    for (const pos in currentPositions) {
        let position = currentPositions[pos], nextInstruction = 0, cptMoves = 0;

        while (position && !endWithZ.test(position.name)) {
            position = network.get(instructions[nextInstruction] === 'L' ? position.left : position.right) as Move;
            cptMoves++;
            nextInstruction === instructions.length - 1 ? nextInstruction = 0 : nextInstruction++;    
        }

        moveCounters.push(cptMoves)
    }

    console.log(moveCounters)

    return moveCounters.reduce((x, y) => findLCM(x, y))
}



// Tests
const txtTest1: string = 'RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)\n';
const txtTest2: string = 'LLR\n\nAAA = (BBB, BBB)\nBBB = (AAA, ZZZ)\nZZZ = (ZZZ, ZZZ)\n';
const txtTest3: string = 'LR\n\n11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)\n';

let start: number;

start = Date.now();
console.log(`Test 1: ${howManySteps(txtTest1)} should be equal to 2 | ${(Date.now() - start)}ms\n`);

start = Date.now();
console.log(`Test 2: ${howManySteps(txtTest2)} should be equal to 6 | ${(Date.now() - start)}ms\n`);

start = Date.now();
console.log(`Test 3: ${howManyStepsMultiple(txtTest3)} should be equal to 6 | ${(Date.now() - start)}ms\n`);

// Prod
const txtProd = readInput('inputs/day8.txt');

start = Date.now();
console.log(`Prod 1: ${howManySteps(txtProd)} | ${(Date.now() - start)}ms\n`);

start = Date.now();
console.log(`Prod 2: ${howManyStepsMultiple(txtProd)} | ${(Date.now() - start)}ms\n`);