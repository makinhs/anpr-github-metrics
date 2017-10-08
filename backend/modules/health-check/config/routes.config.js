let HealthCheckController = require('../controllers/health.check.controller.js');

exports.routesConfig = function (server) {
    server.get('/health-check', [
        HealthCheckController.healthCheck
    ]);
};
