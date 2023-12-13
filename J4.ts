import { readFileSync } from 'fs';

const readInput = (fileName) => {
	return readFileSync(fileName, "utf8");
};



// Part 1
function getCardsValue(cards: string) : number {
    const cardsTab: string[] = cards.split('\n');
    cardsTab.pop();

    return cardsTab.map((card) => {
        const allNumbers = card.split(':')[1].split('|');

        const winningNumbers = allNumbers[0].split(' ').filter((number) => number.length > 0).map((number) => parseInt(number));
        const numbers = allNumbers[1].split(' ').filter((number) => number.length > 0).map((number) => parseInt(number));

        const winningNumbersCount : number = numbers.filter((number) => winningNumbers.filter((elem) => elem === number).length > 0).length;
        
        let cpt = 1;
        for (let i = 0; i < winningNumbersCount - 1; i++) {
            cpt *= 2;
        }

        return winningNumbersCount > 0 ? cpt : 0;
    }).reduce((x, y) => x + y, 0);
}



// Part 2
function totalCardsCount(cards: string) : number {
    const cardsTab: string[] = cards.split('\n');
    cardsTab.pop();

    const cardsCount: number[] = [];

    cardsTab.map(() => cardsCount.push(1));

    cardsTab.map((card) => {
        const cardId = cardsTab.indexOf(card);
        const allNumbers = card.split(':')[1].split('|');

        const winningNumbers = allNumbers[0].split(' ').filter((number) => number.length > 0).map((number) => parseInt(number));
        const numbers = allNumbers[1].split(' ').filter((number) => number.length > 0).map((number) => parseInt(number));

        const winningNumbersCount : number = numbers.filter((number) => winningNumbers.filter((elem) => elem === number).length > 0).length;
        for (let j = 0; j < cardsCount[cardId]; j++) {
            for (let i = 1; i < winningNumbersCount + 1; i++) {
                cardsCount[cardId + i]++;
            }
        }

        return;
    })

    return cardsCount.reduce((x, y) => x + y, 0);
}



// Tests
const txtTest: string = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11\n';
// console.log(txtTest);

let start: number;

start = Date.now();
console.log(`Test 1: ${getCardsValue(txtTest)} should be equal to 13 | ${(Date.now() - start)}ms\n`);

start = Date.now();
console.log(`Test 2: ${totalCardsCount(txtTest)} should be equal to 30 | ${(Date.now() - start)}ms\n`);

// Prod
const txtProd = readInput('inputs/day4.txt');

start = Date.now();
console.log(`Prod 1: ${getCardsValue(txtProd)} | ${(Date.now() - start)}ms\n`);

start = Date.now();
console.log(`Prod 2: ${totalCardsCount(txtProd)} | ${(Date.now() - start)}ms\n`);
