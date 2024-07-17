/*
Title: Uptime Monitoring Application
Description: A RESTful API to monitor up or down time of user defined links 
Author: Ashikur Rahman
Date: 12/7/24
*/

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

// app object - module scaffolding 
const app = {};


// testing file system 
data.update('test', 'newFile',{'name':'England', 'language':'English'}, (err) => {
    console.log(err);
});


// create server 
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(environment);
        console.log(`listening to port ${environment.port}`);
    });
};

// handle Request Response 
app.handleReqRes = handleReqRes;


// start the server 
app.createServer();