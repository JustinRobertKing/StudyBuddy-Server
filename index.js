require('dotenv').config();
const cors = require('cors');
const express = require('express');
const expressJWT = require('express-jwt')
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');

// App instance
const app = express();

// Set up middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false}));

// Helper function: This allows our server to parse the incoming token from the client
// This is being run as middleware, so it has access to the incoming request
function fromRequest(req){
  if(req.body.headers.Authorization &&
    req.body.headers.Authorization.split(' ')[0] === 'Bearer'){
    return req.body.headers.Authorization.split(' ')[1];
  }
  return null;
}

// Controllers
// TODO: Ensure all auth routes are protected except for
// POST to /auth/login and /auth/signup
// Remember to pass the JWT_SECRET to ExpressJWT (it will break without it!)
// NOTE on ExpressJWT: The unless portion is only needed if you need exceptions
app.use('/auth', expressJWT({
	secret: process.env.JWT_SECRET,
	getToken: fromRequest
}).unless({
	path: [
		{ url: '/auth/login', methods: ['POST'] },
		{ url: '/auth/signup', methods: ['POST'] },
	]
}), require('./controllers/auth'));

app.use('/user', expressJWT({
	secret: process.env.JWT_SECRET,
	getToken: fromRequest
}).unless({
	path: [
		{ url: '/user', methods: ['GET'] },
		{ url: '/user/survey', methods: ['PUT'] },
		{ url: '/user/bio', methods: ['PUT'] },
		{ url: '/user/image', methods: ['PUT'] },
	]
}), require('./controllers/user'));

app.use('/session', expressJWT({
	secret: process.env.JWT_SECRET,
	getToken: fromRequest
}).unless({
	path: [
		{ url: '/session', methods: ['GET', 'POST'] },
		{ url: '/session/update', methods: ['PUT'] },
	]
}), require('./controllers/session'));

// This is the catch-all route. Ideally you don't get here unless you made a mistake on your front-end
app.get('*', function(req, res, next) {
	res.status(404).send({ message: 'Not Found' });
});

// Listen on specified PORT or default to 3000
app.listen(process.env.PORT || 3000);
