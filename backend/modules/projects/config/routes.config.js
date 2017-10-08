let ProjectsController = require('../controllers/projects.controller');

exports.routesConfig = function (server) {

    server.get('/users/:userId/projects/:projectId', [
        ProjectsController.getByIds
    ]);

};
