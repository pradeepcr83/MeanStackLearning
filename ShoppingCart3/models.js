var mongoose =require('mongoose');
var _ = require('underscore');
module.exports = function(wagner) {
	mongoose.connect('mongodb://127.0.0.1:27017/test');
	
	var Category = mongoose.model('Category', require('./category'), 'categories');
	var Product = mongoose.model('Product', require('./products'), 'products');
	var User = mongoose.model('User', require('./user'), 'user');
	
	var models ={
		Category:Category,
		Product:Product,
		User:User
	};
	_.each(models, function(value, key) {
		wagner.factory(key,function() {
			return value;
		});
	});
};