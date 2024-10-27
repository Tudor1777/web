const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { parse } = require('querystring');

const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    if (pathname === '/proiect.css') {
        serveFile(res, path.join(__dirname, 'proiect.css'), 'text/css');
        return;
    }

    if (pathname === '/proiect.js') {
        serveFile(res, path.join(__dirname, 'proiect.js'), 'application/javascript');
        return;
    }

    if (pathname.match(/\.(jpg|jpeg|png|gif)$/)) {
        serveFile(res, path.join(__dirname, pathname), 'image/' + path.extname(pathname).substring(1));
        return;
    }
    const htmlFiles = [
        '/cont.html', '/contact.html', '/cos.html', '/despre.html', '/geci.html',
        '/hanorace.html', '/home.html', '/pantaloni.html', '/tricouri.html'
    ];
    if (htmlFiles.includes(pathname)) {
        serveFile(res, path.join(__dirname, pathname), 'text/html');
    } else if (pathname === '/') {
        serveFile(res, path.join(__dirname, 'home.html'), 'text/html');
    } else if (pathname === '/api/products') {
        serveFile(res, path.join(__dirname, 'data/products.json'), 'application/json');
    } else {
        serveFile(res, path.join(__dirname, 'error.html'), 'text/html', 404);
    }
});

function serveFile(res, filePath, contentType, statusCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});