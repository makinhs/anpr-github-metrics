let api = require('./api.connection.service');


let URL = `https://api.github.com/repos/italia/anpr`;

exports.getIssues = (state = 'open', page = 1) => {
    return api.get(`${URL}/issues?state=${state}&per_page=100&page=${page}`)
};

exports.changeURL = (newUrl) => {
    URL = newUrl;
};