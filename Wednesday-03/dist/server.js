import * as http from 'http';
http.createServer((request, response) => {
    response.write('Hello');
    response.end();
}).listen(3000);
console.log("Server started on port 3000");
//# sourceMappingURL=server.js.map