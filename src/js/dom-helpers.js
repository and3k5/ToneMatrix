function range(from,length) {
    var result = [];
    for (var i = 0;i<length;i++){
        result.push(from+i);
    }
    return result;
}

const bigLetters = range(65,26).map(i => String.fromCharCode(i));
const smallLetters = range(97,26).map(i => String.fromCharCode(i));
const numbers = range(48,10).map(i => String.fromCharCode(i));

const possibleFirstChars = [].concat(bigLetters).concat(smallLetters);
const allChars = [].concat(bigLetters).concat(smallLetters).concat(numbers);



function randomChar(chars) {
    return chars[Math.floor(Math.random()*chars.length)];
}

export function createUniqueId(len = 15, doc = document) {
    let id;
    do {
        id = randomChar(possibleFirstChars); // first char cannot be number
        for (var i = 1;i<len;i++) {
            id += randomChar(allChars);
        }
    } while (doc.getElementById(id) != null)
    return id;
}