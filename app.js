
var http = require('http');
var express = require('express');
require('./db');
var data = require('./routes/data');


var app = express();


app.use(express.bodyParser());
app.use(express.static('./public'));
app.set('port', process.env.PORT || 5000);
app.get('/data',data.list);
app.post('/find',data.find);
app.post('/data',data.save);
app.delete('/data/:id',data.del);
app.get('/clear',data.clear);

//app.listen(process.env.PORT||5000, function () { console.log('Express server started at port 5000'); });


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
