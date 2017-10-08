const sqlPromise = require('bluebird');
const daoConnectionService = require('../../common/services/dao.connection.service.js');



exports.insert = (user, project, openIssues = 0, avgClosedHoursTime = 0, avgFirstAnswerTime = 0) => {
    let query = `INSERT INTO projects (user, project, openIssues, avgClosedHoursTime, avgFirstAnswerTime) VALUES (?, ?, ?, ?, ?)`;
    let queryParams = [user, project, openIssues, avgClosedHoursTime, avgFirstAnswerTime];

    return daoConnectionService.executeQuery(query, queryParams);
};

exports.get = (user, project) => {
    let query = `SELECT * FROM anpr_metrics.projects where user = ? and project = ?;`;
    let queryParams = [user, project];

    return daoConnectionService.executeQuery(query, queryParams);
};

exports.patch = (user, project, data) => {
    let query = `UPDATE projects SET `;
    let queryFields = [];
    let queryParams = [];

    daoConnectionService.patchBuilder(queryFields, queryParams, data, 'openIssues');
    daoConnectionService.patchBuilder(queryFields, queryParams, data, 'avgClosedHoursTime');
    daoConnectionService.patchBuilder(queryFields, queryParams, data, 'avgFirstAnswerTime');
    daoConnectionService.patchBuilder(queryFields, queryParams, data, 'updatedAt');

    queryFields.join(',');
    query += queryFields + ' WHERE `user`= ? and project = ?';
    queryParams.push(user);
    queryParams.push(project);
    return daoConnectionService.executeQuery(query, queryParams);
};

