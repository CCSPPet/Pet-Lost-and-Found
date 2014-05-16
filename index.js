var express = require('express');
require('./db');
var data = require('./routes/data');


var app = express();


app.use(express.bodyParser());
app.use(express.static('./public'));

app.get('/data',data.list);
app.post('/data',data.save);
app.delete('/data/:id',data.del);
app.get('/clear',data.clear);

app.listen(5000, function () { console.log('Express server started at port 5000'); });
