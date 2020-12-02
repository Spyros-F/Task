// // app.js

const Koa = require('koa');
const koaBody = require('koa-body');

// create app instance
const app = new Koa();

// middleware functions
app.use(koaBody());

// Require the Router we defined in books.js
let address = require('./address.js');

// Use the Router on the sub route /books
app.use(address.routes());

// use the router here

app.listen(8080);

