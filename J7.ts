import { readFileSync } from 'fs';

const readInput = (fileName) => {
	return readFileSync(fileName, "utf8");
};



// Types
type Hand = string[];
type Play = {
    hand: Hand,
    type: number,
    bid: number,
    rank: number
};



// Regex
const fiveSame = /(.)\1{4}/;
const fourSame = /(.)\1{3}/;
const fullHouse = /(.)\1{2}(.)\2{1}|(.)\3{1}(.)\4{2}/;
const threeSame = /(.)\1{2}/;
const twoSameTwice = /(.)\1{1}(.)\2{1}|(.)\3{1}.(.)\4{1}/;
const twoSame = /(.)\1{1}/;


// Part 1
function sortHand(hand: Hand) : Hand {
    const countTable = [0,0,0,0,0,0,0,0,0,0,0,0,0]
    hand.map((card) => countTable[translate(card) as number - 2]++);

    const retHand: string[] = [];

    while (retHand.length < 5) {
        let maxId = 0;

        for (let i = 0; i < countTable.length; i++) {
            if (countTable[i] >= countTable[maxId]) maxId = i;
        }

        if (countTable[maxId] === 0) break;
        
        for (let i = 0; i < countTable[maxId]; i++) {
            retHand.push(translate(maxId+2) as string)
        }

        countTable[maxId] = 0;
    }

    return retHand;
}

function translate(x: string | number) : number | string {
    if (typeof x === 'string') {
        switch(x) {
            case 'A':
                return 14;
            case 'K':
                return 13;
            case 'Q':
                return 12;
            case 'J':
                return 11;
            case 'T':
                return 10;
            default:
                return parseInt(x);
        }
    }

    // typeof x === "number"

    if (x < 10) {
        return x.toString();
    }

    switch(x) {
        case 10:
            return 'T';
        case 11:
            return 'J';
        case 12:
            return 'Q';
        case 13:
            return 'K';
        case 14:
            return 'A';
        default:
            return '';
    }
}

function handType(hand: string) : number {
    if (fiveSame.test(hand)) {
        return 7;
    }

    if (fourSame.test(hand)) {
        return 6;
    }

    if (fullHouse.test(hand)) {
        return 5;
    }

    if (threeSame.test(hand)) {
        return 4;
    }

    if (twoSameTwice.test(hand)) {
        return 3;
    }

    if (twoSame.test(hand)) {
        return 2;
    }

    return 1;
}

function sortEqualPlays(plays: Play[]) : Play[] {
    plays.sort((playA, playB) => {
        if (<number>translate(playA.hand[0]) !== <number>translate(playB.hand[0])) return <number>translate(playB.hand[0]) - <number>translate(playA.hand[0]);
        if (<number>translate(playA.hand[1]) !== <number>translate(playB.hand[1])) return <number>translate(playB.hand[1]) - <number>translate(playA.hand[1]);
        if (<number>translate(playA.hand[2]) !== <number>translate(playB.hand[2])) return <number>translate(playB.hand[2]) - <number>translate(playA.hand[2]);
        if (<number>translate(playA.hand[3]) !== <number>translate(playB.hand[3])) return <number>translate(playB.hand[3]) - <number>translate(playA.hand[3]);
        return <number>translate(playB.hand[4]) - <number>translate(playA.hand[4]);
    })

    return plays;
}

function rankPlays(plays: Play[]) : void {
    let rank = plays.length;

    for (const play of plays) {
        play.type = handType(sortHand(play.hand).join(''));
    }

    for (let i = 7; i > 0; i--) {
        sortEqualPlays(plays.filter((play) => play.type === i)).map((play) => {
            play.rank = rank;
            rank--;
        })
    }

    return;
}

function totalWinnings(input: string) : number {
    const inputTab = input.split('\n').map((input) => input.split(' '));
    inputTab.pop();

    const plays: Play[] = [];

    for (let i = 0; i < inputTab.length; i++) {
        plays.push({hand: inputTab[i][0].split(''), type: 0, bid: parseInt(inputTab[i][1]), rank: 0})
    }

    rankPlays(plays);

    return plays.reduce((x, y) => x + (y.bid * y.rank), 0);
}




// Part 2





// Tests
const txtTest1: string = '32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483\n';
const txtTest2: string = 'KKKKK 28\nAKKKK 28\nKKKKA 28\nAAKKK 28\nKKKAA 28\nAAAKQ 28\nAKKKQ 28\nAKQQQ 28\nAAKKQ 28\nAAKQQ 28\nAKKQQ 28\nAAKQJ 28\nAKKQJ 28\nAK332 28\nAKQJJ 28\nAKQJT 28\n'
// console.log(txtTest1);
// totalWinnings(txtTest1);

let start: number;

start = Date.now();
console.log(`Test 1: ${totalWinnings(txtTest1)} should be equal to 6440 | ${(Date.now() - start)}ms\n`);

// start = Date.now();
// console.log(`Test 2: ${a(txtTest)} should be equal to  | ${(Date.now() - start)}ms\n`);

// // // Prod
const txtProd = readInput('inputs/day7.txt');

start = Date.now();
console.log(`Prod 1: ${totalWinnings(txtProd)} | ${(Date.now() - start)}ms\n`);

// start = Date.now();
// console.log(`Prod 2: ${a(txtProd)} | ${(Date.now() - start)}ms\n`);
