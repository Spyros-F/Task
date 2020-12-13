const Koa = require('koa');
const koaBody = require('koa-body');

// create app instance
const app = new Koa();

// middleware functions
app.use(koaBody());

let address = require('./address.js');

// Use the Router on the sub route /address
app.use(address.routes());

app.listen(8080);

//comment to compare for new branch

