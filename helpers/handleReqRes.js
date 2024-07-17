// Title: Handle Request Response
// Description: Handle Request and response
// Author: Ashikur Rahman
// Date: 15/7/24

// dependencies 
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler')

// module saffolding 
const handler = {};

handler.handleReqRes = (req, res) => {
  // request handling
  // get the url and parse it 
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;

  const requestPropeties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  }

  let decoder = new StringDecoder('utf-8');
  let realData = '';
  const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;



  req.on('data', (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on('end', () => {
    realData += decoder.end();

    chosenHandler(requestPropeties, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 500;
      payload = typeof payload === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      // return the final response 
      res.writeHead(statusCode);
      res.end(payloadString);

    });
    
    
    // response handle 
    res.end('hello programmer');
  })
};


module.exports = handler;