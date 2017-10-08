let config = require('./modules/common/config/env.config').config;

const authRouter = require('./modules/auth/config/routes.config');
const healthCheckRouter = require('./modules/health-check/config/routes.config');
const facebookRouter = require('./modules/identities/facebook/config/routes.config');
const projectsRouter = require('./modules/projects/config/routes.config');

let express = require('express');
let server = express();
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');

server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

server.use(session({
    secret: config.jwt_secret,
    resave: true,
    saveUninitialized: true
}));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));

server.use(bodyParser.json({limit: '50mb'}));

// <------ ADD ROUTES MODULES HERE ------>
authRouter.routesConfig(server);
healthCheckRouter.routesConfig(server);
facebookRouter.routesConfig(server);
projectsRouter.routesConfig(server);


server.listen(config.port, function () {
    console.log('Server up and listening at port %s', config.port);
});