const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {   // req object can be coming from client or postman
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {     // if it's a GET request, look at URL that was requested 
        let fileUrl = req.url;      // local variable fileUrl, value = get contents of URL like this 
        if (fileUrl === '/') {      // if request is just to host name (ie local host) without specifying About or Index...  
            fileUrl = '/index.html';  // ... then req.url property will just contain forward slash and we'll automatically send back index.html page 
        }

        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);

        if (fileExt === '.html') {
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                fs.createReadStream(filePath).pipe(res);
            });
        } else {    
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {   // this handles anything other than GET request 
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

server.listen(port, hostname, () => {          // 2 arguments; port and hostname variables, 3rd argument is a callback function that will be executed when the server starts up
    console.log(`Server running at http://${hostname}:${port}/`);   // console to let us know server is running 
});