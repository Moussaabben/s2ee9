'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');

// loading the logo object and the html respond
var logo = fs.readFileSync('./icone.ico');
var index = fs.readFileSync('./page/index.html');

// the index page requiarements
var indexReq = ['/css/font-awesome.min.css', '/css/ie.css', '/css/loader.css', '/css/normalize.css', '/css/style.css', '/fonts/fontawesome-webfont.eot', '/fonts/fontawesome-webfont.svg', '/fonts/fontawesome-webfont.ttf', '/fonts/fontawesome-webfont.woff', '/fonts/fontawesome-webfont.woff2', '/fonts/FontAwesome.otf', '/images/background.jpg', '/images/sphere.png', '/images/clouds/cloud-01.png', '/images/clouds/cloud-02.png', '/images/flakes/depth1/flakes1.png', '/images/flakes/depth1/flakes2.png', '/images/flakes/depth1/flakes3.png', '/images/flakes/depth1/flakes4.png', '/images/flakes/depth2/flakes1.png', '/images/flakes/depth2/flakes2.png', '/images/flakes/depth3/flakes1.png', '/images/flakes/depth3/flakes2.png', '/images/flakes/depth3/flakes3.png', '/images/flakes/depth3/flakes4.png', '/images/flakes/depth4/flakes.png', '/images/flakes/depth5/flakes.png', '/js/jquery.countdown.min.js', '/js/jquery.js', '/js/main.js', '/js/plugins.js'];

// this function is an ingunction that sums the ascii code of the chars of action then % imgNum
var imageName = function(action, imgNum) {
	return Array.from(action, ch => ch.charCodeAt(0)).reduce( (total, elem) => total+elem ) % imgNum;
}

// creat the server object
var server = http.createServer(function(req, res){
	var request = url.parse(req.url, true);
	var action = request.pathname;
	console.log('[+] New Connection action =' + action);

	if (action === '/') { 	
		// for in case the request is for the index page
		res.writeHead(200, {'Content-Type': 'text/html' });
		res.end(index);

	} else if (action === '/favicon.ico') {
		// for sending the icon it must be at ./favicon.ico
		res.writeHead(200, {'Content-Type': 'image/ico' });
		res.end(logo, 'binary');

	} else if (indexReq.includes(action)) {
		// for sending the index page req
		var req = fs.readFileSync('./page' + action);
		res.writeHead(200);
		res.end(req);

	} else {
		// repondes with an image from the image file with the name imageName().js
		// imageName takes the action and the num of images in the folder as param
		var img = fs.readFileSync('./images/' + imageName(action, 18) + '.png');
		res.writeHead(200, {'Content-Type': 'image/png' });
		res.end(img, 'binary');

	} 
})

try {
	if ( /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/.test(process.argv[2]) && /^[0-9]*$/.test(process.argv[3]) ) {
		console.log('[+] Server Started at '+ process.argv[2] + ':' + process.argv[3]);
		server.listen(Number(process.argv[3]), process.argv[2]);
	} else {
		console.log('[-] Wrong Args must be node {path} {ip} {port}');
	}	
} catch (error) {
	console.log('[-] error hapend, Sorry, ' + error);
}
