"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
http.createServer(function (request, response) {
    response.write('Hello');
    response.end();
}).listen(3000);
console.log("Server started on port 3000");
