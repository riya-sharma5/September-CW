import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    const { url, method } = request;

    response.setHeader('Content-Type', 'text/plain');

    if (method === 'GET') {
        switch (url) {
            case '/':
                response.statusCode = 200;
                response.write('Welcome to the homepage!');
                break;

            case '/aboutMe':
                response.statusCode = 200;
                response.write('Welcome to the about section');
                break;

            default:
                response.statusCode = 404;
                response.write('404 Not Found');
                break;
        }
    } else {
        response.statusCode = 405;
        response.write('Method Not Allowed');
    }
   response.end();
});

server.listen(3000);
console.log('Server started');
