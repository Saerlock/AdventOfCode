import { readFileSync } from 'fs';

const readInput = (fileName) => {
	return readFileSync(fileName, "utf8");
};



// Types
type Grid = string[][];



// Part 1
function checkNeighbors(initGrid: Grid, grid: Grid, i: number, j: number, validTable) : void {
    if (validTable[i][j]) return;

    if (
        (grid[i-1] && (
            grid[i-1][j-1] && !grid[i-1][j-1].match(/\d|\./) ||
            !grid[i-1][j].match(/\d|\./) ||
            grid[i-1][j+1] && !grid[i-1][j+1].match(/\d|\./)
        )) ||
        grid[i][j-1] && !grid[i][j-1].match(/\d|\./) ||
        grid[i][j+1] && !grid[i][j+1].match(/\d|\./) ||
        (grid[i+1] && (
            grid[i+1][j-1] && !grid[i+1][j-1].match(/\d|\./) ||
            !grid[i+1][j].match(/\d|\./) ||
            grid[i+1][j+1] && !grid[i+1][j+1].match(/\d|\./)
        ))
        
    ) {
        validTable[i][j] = true;

        let tempJ = j-1;
        while (initGrid[i][tempJ] && initGrid[i][tempJ].match(/\d/)) {
            validTable[i][tempJ] = true;
            tempJ--;
        }
        tempJ = j+1;
        while (initGrid[i][tempJ] && initGrid[i][tempJ].match(/\d/)) {
            validTable[i][tempJ] = true;
            tempJ++;
        }

        return;
    }

    grid[i][j] = '.';
    return;
}

function sumAjdacents(text: string) : number {
    const textGrid: Grid = text.split('\n').map((line) => line.split(''));
    textGrid.pop();

    const textGridCopy: Grid = [];
    textGrid.map((line) => textGridCopy.push([...line]));

    const validTable: (boolean | undefined)[][] = textGrid.map((line) => line.map((char) => char.match(/\d/) ? false : undefined))

    for (let i = 0; i < textGrid.length; i++) {
        for (let j = 0; j < textGrid[0].length; j++) {
            if (textGrid[i][j].match(/\d/)) {
                checkNeighbors(textGridCopy, textGrid, i, j, validTable)
            }
        }
    }

    for (let i = 0; i < textGridCopy.length; i++) {
        for (let j = 0; j < textGridCopy[0].length; j++) {
            if (validTable[i][j] === false) {
                textGridCopy[i][j] = '.'
            }
        }

    }

    const validNumbers: number[] = textGridCopy.map((line) => line.join('').match(/[\d]+/g)).filter((line) => line !== null && line !== undefined).map((line) => line?.reduce((x, y) => x + parseInt(y), 0)) as number[];

    return validNumbers.reduce((x, y) => x + y, 0);
}



// Part 2
function getNumber(grid: Grid, {i, j} : {i: number, j: number}) {
    const buf: string[] = [];
    buf.push(grid[i][j]);

    let tempJ = j-1;
    while (grid[i][tempJ] && grid[i][tempJ].match(/\d/)) {
        buf.unshift(grid[i][tempJ]);
        tempJ--;
    }

    tempJ = j+1;
    while (grid[i][tempJ] && grid[i][tempJ].match(/\d/)) {
        buf.push(grid[i][tempJ]);
        tempJ++;
    }

    return parseInt(buf.join(''));
}

function neighbors(grid: Grid, {i, j} : {i: number, j: number}) : number[] {
    let neighbors: number[] = [];

    if (grid[i-1]) {
        if (grid[i-1][j].match(/\d/)) {
            neighbors.push(getNumber(grid, {i: i-1, j: j}))
        } else {
            if (grid[i-1][j-1] && grid[i-1][j-1].match(/\d/)) {
                neighbors.push(getNumber(grid, {i: i-1, j: j-1}))
            }  // Left

            if (grid[i-1][j+1] && grid[i-1][j+1].match(/\d/)) {
                neighbors.push(getNumber(grid, {i: i-1, j: j+1}))
            }  // Right
        }  
    }  // Top

    if (grid[i][j-1] && grid[i][j-1].match(/\d/)) {
        neighbors.push(getNumber(grid, {i: i, j: j-1}));
    }  // Left

    if (grid[i][j+1] && grid[i][j+1].match(/\d/)) {
        neighbors.push(getNumber(grid, {i: i, j: j+1}));
    }  // Right

    if (grid[i+1]) {
        if (grid[i+1][j].match(/\d/)) {
            neighbors.push(getNumber(grid, {i: i+1, j: j}))
        } else {
            if (grid[i+1][j-1] && grid[i+1][j-1].match(/\d/)) {
                neighbors.push(getNumber(grid, {i: i+1, j: j-1}))
            }  // Left

            if (grid[i+1][j+1] && grid[i+1][j+1].match(/\d/)) {
                neighbors.push(getNumber(grid, {i: i+1, j: j+1}))
            }  // Right
        }  
    }  // Bottom

    return neighbors;
}

function gearRatios(text: string) : number {
    const textGrid: Grid = text.split('\n').map((line) => line.split(''));
    textGrid.pop();

    const starsTab: {i: number, j: number}[] = [];

    for (let i = 0; i < textGrid.length; i++) {
        for (let j = 0; j < textGrid[0].length; j++) {
            if (textGrid[i][j] === '*') {
                starsTab.push({i: i, j: j})
            }
        }
    }
    
    return starsTab.map((star) => neighbors(textGrid, star)).filter((tab) => tab.length === 2).map((tab) => tab[0]*tab[1]).reduce((x, y) => x + y, 0);
}


// Tests
const txtTest: string = '467..114..\n...*......\n..35..633.\n......#...\n617*..1...\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..\n'

let start = Date.now();

console.log(`Test 1: ${sumAjdacents(txtTest)} should be equal to 4362`)
console.log(`Tests (part 1) took ${(Date.now() - start)}ms\n`)

start = Date.now();

console.log(`Test 2: ${gearRatios(txtTest)} should be equal to 467835`)
console.log(`Tests (part 2) took ${(Date.now() - start)}ms\n`)

// Prod
start = Date.now();

const txtProd = readInput('inputs/day3.txt')
console.log(`Prod 1: ${sumAjdacents(txtProd)}`)
console.log(`Prod 2: ${gearRatios(txtProd)}`)
console.log(`Prod took ${(Date.now() - start)}ms\n`);
