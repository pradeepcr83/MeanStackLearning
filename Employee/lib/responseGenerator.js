var fs = require('fs')

exports.send404 = function(response){
    console.log('Resource not found');
    response.writeHead(404, {
        'content-Type' : 'text/plain'        
    });
    response.end('Not found');
}

exports.sendJson = function(data,response) {
    response.writeHead(200, {
        'content-Type' : 'application/jason'        
    });
    response.end(JSON.stringify(data));
}

exports.send500 = function(data,response) {
    response.writeHead(500, {
        'content-Type' : 'text/jason'        
    });
    response.end(data);
}

exports.staticFile = function (staticPath) {
    return function(data, response) {
        var readStream;
        data = data.replace(/^(\/home)(.html)?$/i,'$1.html');
        data = '.' + staticPath + data;
        fs.stat(data, function (error, stats) {
            if (error || stats.isDirectory()) {
                return exports.send404(response);
            }
            readStream = fs.createReadStream(data);
            return readStream.pipe(response);            
            });
        }
}