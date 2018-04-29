const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  fs.readFile('./' + request.url, (err, data) => {
    if (!err) {
      const dotoffset = request.url.lastIndexOf('.');
      const mimetype = dotoffset === -1
        ? 'text/plain'
        : {
          '.html': 'text/html',
          '.ico': 'image/x-icon',
          '.jpg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.css': 'text/css',
          '.js': 'text/javascript'
        }[request.url.substr(dotoffset)];
      response.setHeader('Content-type', mimetype);
      response.end(data);
      console.log(request.url, mimetype);
    }
  });
}).listen(8080);

console.log('Server started listening on 8080');
