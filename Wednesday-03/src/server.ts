import * as http from 'http'

import type { IncomingMessage, ServerResponse } from "http";


http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.write('Hello');
    response.end();
}).listen(3000);

console.log("Server started on port 3000");