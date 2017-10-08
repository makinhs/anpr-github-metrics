let config = require('../../common/config/env.config').config;
let projectDao = require('../daos/projects.dao');
let issueParserService = require('../../common/services/issue.parser.service');

exports.getByIds = (req, res) => {
    return projectDao.get(req.params.userId, req.params.projectId)
        .then((result) => {
            if (result && result.length) {
                res.status(200).send(result[0]);
            } else {
                issueParserService.parseIssues(req.params.userId, req.params.projectId)
                    .then((result) => {
                        projectDao.insert(result.user, result.project, result.openIssues, result.avgClosedHoursTime, result.avgFirstAnswerTime)
                            .then(() => {
                                res.status(200).send(result);
                            });
                    });
            }
        });
};

exports.put = (req, res) => {
    res.status(501).send();
};