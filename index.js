var durations = [];
function calculateDurationSince(timestamps) {
    var last = timestamps.pop();
    var durations = [];
    while (timestamps.length) {
        durations.push(last - (last = timestamps.pop()));
    }
    return durations.reverse();
}

function displayMillis(mills) {
    if (mills > 1000)
        return (mills / 1000) + ' s';
    return mills + ' ms';
}

function addDurationEvent() {
    durations.push(Date.now());
}

function endDurationEvent() {
    var current = durations;
    current.push(Date.now());
    durations = [];
    var timeElapsed = current[current.length - 1] - current[0];

    console.log([
        ['time elapsed:', displayMillis(timeElapsed)].join(' '),
        ['keys duration:', calculateDurationSince(current).map(displayMillis)].join(' ')
    ].join(' --- '));
}

const shifted_keys = [
    // number row
    ['`', '~'],
    ['1', '!'],
    ['2', '@'],
    ['3', '#'],
    ['4', '$'],
    ['5', '%'],
    ['6', '^'],
    ['7', '&'],
    ['8', '*'],
    ['9', '('],
    ['0', ')'],
    ['-', '_'],
    ['=', '+'],

    // q row
    ['q', 'Q'],
    ['w', 'W'],
    ['e', 'E'],
    ['r', 'R'],
    ['t', 'T'],
    ['y', 'Y'],
    ['u', 'U'],
    ['i', 'I'],
    ['o', 'O'],
    ['p', 'P'],
    ['[', '{'],
    [']', '}'],
    ['\\', '|'],

    // a row
    ['a', 'A'],
    ['s', 'S'],
    ['d', 'D'],
    ['f', 'F'],
    ['g', 'G'],
    ['h', 'H'],
    ['j', 'J'],
    ['k', 'K'],
    ['l', 'L'],
    [';', ':'],
    ['\'', '"'],

    // z row
    ['z', 'Z'],
    ['x', 'X'],
    ['c', 'C'],
    ['v', 'V'],
    ['b', 'B'],
    ['n', 'N'],
    ['m', 'M'],
    [',', '<'],
    ['.', '>'],
    ['/', '?'],
];


const typeable_keys = [];
shifted_keys.forEach(key => {
    typeable_keys.push(key[0]);
    typeable_keys.push(key[1]);
});

const key_to_key_ms = [];
shifted_keys.forEach(key => {
    typeable_keys.push(key[0]);
    typeable_keys.push(key[1]);
});


function keydownhandler(e) {
    // console.log('keydown', e.code, e);
    console.log('keydown', e.code);
    if(e instanceof KeyboardEvent) {
        if(e.code === 'Enter') {
            const value = e.target.value;
            console.log('Enter', value);
            window.document.getElementById('typetext').textContent = value;
            endDurationEvent();
        } else if(typeable_keys.includes(e.key)) {
            window.document.getElementById('outputtext').textContent = durations;
            console.log('FOUND key', e.key);
            endDurationEvent();
            addDurationEvent();
        }
    }
}


window.addEventListener('DOMContentLoaded', function (e) {
    console.log('loaded');
    this.document.getElementById('in')
        .addEventListener('keydown', keydownhandler, false);
    this.document.getElementById('in')
        .addEventListener('keyup', function (e) {
            // console.log('keyup', e);
            console.log('keyup', e.code);
        }, false);
}, false);

// // content of index.js
// const http = require('http')
// const port = 3000

// const requestHandler = (request, response) => {
//     console.log(request.url)
//     response.end('Hello Node.js Server!')
// }

// const server = http.createServer(requestHandler)

// server.listen(port, (err) => {
//     if (err) {
//         return console.log('something bad happened', err)
//     }

//     console.log(`server is listening on ${port}`)
// })