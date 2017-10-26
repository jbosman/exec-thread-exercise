const express = require('express');
const path = require('path');
const morgan = require('morgan');

const { __processToRoot } = require('./utilities/shell/commands');

// Static files to serve
const browser = path.join(__dirname, '../browser');
const angularHotKeys = path.join(__dirname, '../node_modules/angular-hotkeys/build');
const publicDir = path.join( __dirname, '../public');
const indexHTML = path.join( __dirname, './index.html');
// API routes
const api = require('./routes/api');

// Setting node process to root folder
// User will be isolated to root folder
__processToRoot();

const app = express();
app.use(morgan('dev'));

app.use(express.static(browser));
app.use(express.static(angularHotKeys));
app.use(express.static(publicDir));

app.use('/api', api);

app.get('/', (req, res) => {
	res.sendFile(indexHTML);
})

app.listen( 3000, () => {
	console.log('Listing on port: 3000...');
});