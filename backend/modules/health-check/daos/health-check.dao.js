const sqlPromise = require('bluebird');
const daoConnectionService = require('../../common/services/dao.connection.service.js');


exports.get = () => {
    let query = `select 1`;
    return daoConnectionService.executeQuery(query, [])
        .then((result) => {
            return result;
        });
};

