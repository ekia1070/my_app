var http = require('http');
var fs = require('fs');

http.createServer(function handler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<link href=\"/css/styles.css\" rel=\"stylesheet\">");
    res.write("</head>");
    res.write("<body class=\"login-bg\">");
    res.write("<div class=\"header\">");
    res.write("</div>");
    res.write("</body>");
    res.write("</html>");

    res.end();
}).listen(1337, '127.0.0.1');