const express = require('express');
const router = require('./root.js');

let args = process.argv.slice(2);
if (args.length != 1) {
    console.log('missing argument: host and port');
    return;
}
if (!args[0].includes(':')) {
    console.log('missing separator ":" between host and port');
    return;
}
let [host, port] = args[0].split(':', 2);

const app = express();
app.use(router);
app.listen(port, host, () => {
    console.log(`Listening on ${host}:${port}`);
});
