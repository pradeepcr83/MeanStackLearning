var mongodb = require('mongodb');
var uri = 'mongodb://localhost:27017/example';
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(uri, function(error, db){
	if(error){
		console.log(error);
		process.exit(1);
	}
	
	docToInsert = {
		name:'jaws',
		rating:'PG',
		year:1978,
		director:"Steven Spielberg"
	}
	
	db.collection('movies').insert(docToInsert, function(error,result) {
	if(error){
		console.log(error);
		process.exit(1);
	}
	db.collection('movies').find().toArray(function(error, docs) {
	if(error){
		console.log(error);
		process.exit(1);
	}
	console.log('found docs....');
	docs.forEach(function(doc) {
		console.log(JSON.stringify(doc));
	});
	process.exit(0);
	});	
  });
});