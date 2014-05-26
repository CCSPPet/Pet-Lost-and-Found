var mongoose = require('mongoose');
var Data = mongoose.model('Data');
exports.list = function(req,res){
	console.log("get");
	Data.find(function(err,datas,count){
		if(err){
			console.error(err);
			res.json({error:err.name},500);
		};
		res.json(datas);
	});
};
exports.find = function(req,res){
	console.log("find");
	console.log(req.body);
	Data.find(req.body,function(err,datas){
		if(err){
			console.error(err);
			//res.json({error:err.name},500);
		}
		res.json(datas);
	});
};
exports.save = function(req,res){
	console.log("save");
	console.log(req.body);
	var data = new Data(req.body);
	console.log(data);
	data.save(function(err,newData){
		if(err){
			console.error(err);
			res.end("ERROR");
		}
		res.end("SUCCESS");
		//res.redirect('/');
	});
};
exports.del = function(req,res){
	console.log("del");
	Data.findById(req.params.id,function(err,data){
		if(err){
			console.error(err);
			res.json({error:err.name},500);
		}
		data.remove(function(err,rmData){
			if(err){
				console.error(err);
				res.json({error:err.name},500);
			}
			res.json(rmData);
		});
		
	});
};
exports.clear = function(req,res){
	console.log("clear");
	Data.remove(function(err,rmData){
			if(err){
				console.error(err);
				res.json({error:err.name},500);
			}
			res.json(rmData);
		});
	res.redirect('/data');
};