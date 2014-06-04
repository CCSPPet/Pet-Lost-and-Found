
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var DataSchema = new Schema({
	name:{type:String,required: true},
	photo:{type:String},
	species:{type:String},
	breed:{type:String},
	feature:{type:String},
	loseplace:{type:String},
	map_posk:{type:String,required: true},
	map_posA:{type:String,required: true},
	map_rad:{type:String}
});
mongoose.connect('mongodb://localhost/test');

mongoose.connection.once('error',function(err){
	console.log(err);
});
mongoose.connection.once('open',function(){
	console.log('open!');
});
mongoose.model('Data',DataSchema);