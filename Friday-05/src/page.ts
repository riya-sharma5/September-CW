import * as http from 'http';
import type { IncomingMessage, ServerResponse } from 'http';


const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    const { url, method } = request;

   
    response.setHeader('Content-Type', 'text/plain');

    if (method === 'GET') {
        if (url === '/') {
        response.statusCode = 200;
        response.write('Welcome to the homepage!');


        } else if (url === '/aboutMe') {
        response.statusCode = 200;
       response.write("welcome to the about section");
        } 
        
        else {
        response.statusCode = 404;
        response.write("404 Not Found");
        }
    } 
    
    else {
        response.statusCode = 405;
        response.write('Method Not Allowed');
    }

    response.end();
});

server.listen(3000);
console.log("server started");
