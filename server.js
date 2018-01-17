const path = require('path');
const express = require("express");
const favicon = require('serve-favicon')

const DIST_DIR = path.join(__dirname, "dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const port = process.env.port || 3000;
const host = process.env.host || '0.0.0.0';

const app = express();
app.set("port", port);

app.use(favicon(path.join(DIST_DIR, 'favicon.ico')))

app.get('*.woff', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'application/font-woff');
	next();
});

app.get('*.eot', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'application/vnd.ms-fontobject');
	next();
});

app.get('*.ttf', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'application/font-sfnt');
	next();
});


app.get('*.svg', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'image/svg+xml');
	next();
});

app.get('*.js', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'text/javascript');
	next();
});

app.get('*.css', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'text/css');
	next();
});

app.use(express.static(DIST_DIR));
app.get("*", (req, res) => res.sendFile(HTML_FILE));

app.listen(port, host, function (err, result) {
	if (err) {
		console.log(err);
	}

	console.log('Listening at ' + host + ':' + port);
});

