const txt1 = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet";
const txt2 = "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen";



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
    return text.split('\n')
            .map((elem) => {
                let first = elem.match(/[\d]|one|two|three|four|five|six|seven|eight|nine/)[0];

                const temp = elem.match(/[\d]|one|two|three|four|five|six|seven|eight|nine/g);
                let last = temp[temp.length - 1];

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
console.log(`Test 1: ${getNumber(txt1)} is supposed to equal 142`);
console.log(`Test 2: ${getNumberFormated(txt2)} is supposed to equal 281`);