console.log('Server-side code running');
var ncp = require('ncp').ncp;

ncp.limit = 16;

var bodyParser = require('body-parser')
var express = require('express'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 5000;

app.use(bodyParser());


// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(5000, () => {
    console.log('listening on 5000');
});

// serve the homepage
app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/client.js');

});

app.post('/', function(request, response) {
    console.log('POST /');
    console.dir(request.body);
    let src = request.body["srcinput"];
    let dest = request.body["destinput"];
    ncp(src,dest, function(err){
        console.log(err)
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('Copied');
});