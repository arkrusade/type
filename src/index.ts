import { TypingSingleton } from "./typing"

window.addEventListener('DOMContentLoaded', function (e) {
    console.log('loaded123');
    const singleton = new TypingSingleton();
    const input = this.document.getElementById('in')!;
    input.addEventListener('keydown', singleton.keydownhandler, false);
    input.addEventListener('keyup', function (e) {
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