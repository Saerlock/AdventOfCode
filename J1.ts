import { readFileSync } from 'fs';

const readInput = (fileName) => {
	return readFileSync(fileName, "utf8");
};



// Part 1
function getNumber(text) {
    return text.split('\n')
            .map((elem) => {
                const first = elem.match(/[0-9]/);
                const last = elem.split('').reverse().join('').match(/[0-9]/);

                return parseInt(first + last);
            })
            .reduce((x, y) => x + y, 0);
}



// Part 2
function getNumberFormated(text) {
    const textTab = text.split('\n');
    textTab.pop();

    return textTab.map((elem) => {
        const matchFirst = elem.match(/([\d]|one|two|three|four|five|six|seven|eight|nine)/g);
        let first = matchFirst[0];

        const matchLast = elem.split('').reverse().join('').match(/([\d]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g);
        let last = matchLast[0].split('').reverse('').join('');            

        if (!first.match(/[0-9]/)) {
            switch(first) {
                case 'one':
                    first = '1';
                    break;
                case 'two':
                    first = '2';
                    break;
                case 'three':
                    first = '3'
                    break;
                case 'four':
                    first = '4'
                    break;
                case 'five':
                    first = '5'
                    break;
                case 'six':
                    first = '6'
                    break;
                case 'seven':
                    first = '7'
                    break;
                case 'eight':
                    first = '8'
                    break;
                case 'nine':
                    first = '9'
                    break;
                default:
                    break;
            }
        }                   

        if (!last.match(/[0-9]/)) {
            switch(last) {
                case 'one':
                    last = '1';
                    break;
                case 'two':
                    last = '2';
                    break;
                case 'three':
                    last = '3'
                    break;
                case 'four':
                    last = '4'
                    break;
                case 'five':
                    last = '5'
                    break;
                case 'six':
                    last = '6'
                    break;
                case 'seven':
                    last = '7'
                    break;
                case 'eight':
                    last = '8'
                    break;
                case 'nine':
                    last = '9'
                    break;
                default:
                    break;
            }
        }
        
        return parseInt(first + last);
    })
    .reduce((x, y) => x + y, 0)
}



// Tests
const txt1 = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet\n";
const txt2 = "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen\n";
const txt3 = "twone\n3sevenineight\n"
const txt4 = "threethreetwothree\n";
const txt5 = "five\n";
const txt6 = "sevenine\n";

// console.log(`Test 1: ${getNumber(txt1)} is supposed to equal 142`);
// console.log(`Test 2: ${getNumberFormated(txt2)} is supposed to equal 281`);
// console.log(`Test 3: ${getNumberFormated(txt3)} is supposed to equal 59`);
// console.log(`Test 4: ${getNumberFormated(txt4)} is supposed to equal 33`);
// console.log(`Test 5: ${getNumberFormated(txt5)} is supposed to equal 55`);
// console.log(`Test 6: ${getNumberFormated(txt6)} is supposed to equal 79`);
// console.log(`Test 7: ${getNumberFormated(txt6)} is supposed to equal 79`);



// Prod
const txtProd = readInput('inputs/day1.txt');
// console.log(`\nProd 1: ${getNumber(txtProd)}`);
// console.log(`Prod 2: ${getNumberFormated(txtProd)}`);