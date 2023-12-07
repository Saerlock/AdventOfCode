import { readFileSync } from 'fs';

const readInput = (fileName) => {
	return readFileSync(fileName, "utf8");
};



// Part 1
function sumOfPossibleGamesId(text: string): number {
    const maxRed = 12, maxGreen = 13, maxBlue = 14;
    let idSum = 0;

    const games: string[] = text.split('\n')
    
    games.pop()

    games.map((game) => {
        const gameContent = game.split(':');
        const sets = gameContent[1].split(';')
        const gameNumber = parseInt(gameContent[0].split(' ')[1]);

        let playable = true;

        sets.map((set) => {
            set.split(',').map((elem) => {
                if (elem.charAt(0) === ' ') {
                    elem = elem.substring(1);
                }

                const elemTab = elem.split(' ');
                const quantity = parseInt(elemTab[0]);
                const type = elemTab[1];

                switch (type) {
                    case 'red':
                        if (quantity > maxRed) {
                            playable = false;
                        };
                        break;
                    case 'green':
                        if (quantity > maxGreen) {
                            playable = false;
                        };
                        break;
                    case 'blue':
                        if (quantity > maxBlue) {
                            playable = false;
                        };
                        break;
                    default:
                        break;
                }
            })
        })

        if (playable) {
            idSum += gameNumber;
        }
    })

    return idSum;
}
// Part 2
function fewestDices(text: string): number {
    let powerSum = 0;

    const games: string[] = text.split('\n')
    
    games.pop()

    games.map((game) => {
        const sets = game.split(':')[1].split(';')
        let maxRed = 0, maxGreen = 0, maxBlue = 0;

        sets.map((set) => {
            set.split(',').map((elem) => {
                if (elem.charAt(0) === ' ') {
                    elem = elem.substring(1);
                }

                const elemTab = elem.split(' ');
                const quantity = parseInt(elemTab[0]);
                const type = elemTab[1];

                switch (type) {
                    case 'red':
                        if (quantity > maxRed) {
                            maxRed = quantity;
                        }
                        break;
                    case 'green':
                        if (quantity > maxGreen) {
                            maxGreen = quantity;
                        }
                        break;
                    case 'blue':
                        if (quantity > maxBlue) {
                            maxBlue = quantity;
                        }
                        break;
                    default:
                        break;
                }
            })
        })

        powerSum += (maxRed * maxGreen * maxBlue);
    })

    return powerSum;
}



// Tests
const txtTest1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green\n`;
const txtTest2 = 'Game 1: 5 red, 1 green, 2 blue; 2 green, 8 blue, 6 red; 8 red, 3 blue, 2 green; 6 red, 1 green, 19 blue; 1 red, 17 blue\n'
const txtTest3 = 'Game 31: 7 blue; 2 green, 6 blue; 1 red, 9 blue, 5 green\n';

// console.log(`Test 1: ${sumOfPossibleGamesId(txtTest1)} should be equal to 8`)
// console.log(`Test 2: ${sumOfPossibleGamesId(txtTest2)} should be equal to 0`)
// console.log(`Test 3: ${sumOfPossibleGamesId(txtTest3)} should be equal to 31`)
// console.log(`Test 4: ${fewestDices(txtTest1)} should be equal to 2286`)



// Prod
const txtProd = readInput('inputs/day2.txt')
// console.log(`\nProd 1: ${sumOfPossibleGamesId(txtProd)}`)
// console.log(`\nProd 2: ${fewestDices(txtProd)}`)

