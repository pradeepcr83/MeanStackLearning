
var http = require('http');
var employeeService = require('./lib/employees');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');
Array.prototype.find = function (predicate) {
  for (var i = 0, value; i < this.length; i++) {
    value = this[i];
    if (predicate.call(this, value))
      return value;
  }
  return undefined;
}

http.createServer(function(req, res) {
   var url;
    req.method = req.method.toUpperCase();
    console.log("Request from client for " + req.method + "on url " + req.url) ;
    if(req.method !== 'GET') {
        res.writeHead(501,{
            'content-Type':'text/plain'
        });
        return res.end(req.method + 'is not implemented by this server');
    }
    if(url = /^\/employees$/i.exec(req.url)){
        employeeService.getEmployees(function(error, empData){
            if(error) {
                return responder.send500(error,res);
            }
            return responder.sendJson(empData, res);
        })
        //res.writeHead(200);
        //res.end('employee list');
    }
    else if (url = /^\/employees\/(\d+)$/i.exec(req.url)){
        employeeService.getEmployee(url[1] ,function(error, empData){
            if(error) {
                return responder.send500(error,empData);
            }
            if(!empData) {
                return responder.send404(res);
            }
            responder.sendJson(empData,res);
        })
        //res.writeHead(200);
        //res.end('a single employee');
    }
    else{
        res.writeHead(200);
        res.end('send a static file');
    }        
}).listen(1337,'127.0.0.1');
console.log('Server started at localhost:1337');