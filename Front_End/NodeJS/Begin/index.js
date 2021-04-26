const {
    readFile,
    readFileSync
} = require('fs');

// const text = readFileSync('./hello.txt', 'utf8');
// console.log(text);
// //const txt = readFileSync('./hello.txt', 'utf8');
// readFile('./hello.txt', 'utf8', (err, txt) => {
//     console.log(txt);
// })

// readFile('./Next.txt', 'utf8', (err, txt) => {
//     console.log(txt);
// })

// console.log('Test this pls');
// console.log('Test this pls');
// console.log('Test this pls');
// console.log('Test this pls');
// console.log('Test this pls');



function Readme(link) {
    readFile(link, 'utf8', (err, txt) => {
        console.log(txt);
    })
    console.log('I got open :>');
}

function Testme(link) {
    Readme(link);
    console.log('Test me pls!');
}

function Openme(link) {
    Testme(link);
    console.log('I have opened this');
}

Openme('./hello.txt');


var person = {
    name: "John",
    age: 50
};
console.log(person.name + " is " +person.age);