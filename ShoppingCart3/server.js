var express = require('express');
module.exports =function(){
	var app = express();
	app.get('/', function(){
		res.send("Hello world!!!");
	});
	app.get('/user:user',function(){
		res.send("page for user" + req.params.user + "with option " + req.query.option);
	});
	return app;
};