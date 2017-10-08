let rp = require('request-promise');
let config = require('../config/env.config').config;


let POST = 'POST';
let GET = 'GET';
let PATCH = 'PATCH';
let PUT = 'PUT';
let DELETE = 'DELETE';

function generateOptions(METHOD, URL, BODY) {
    return {
        method: METHOD,
        uri:  URL,
        body: BODY,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        resolveWithFullResponse: true,
        json: true
    };
}

exports.get = (url) => {
    return rp(generateOptions(GET, url));
};

exports.delete = (url) => {
    return rp(generateOptions(DELETE, url));
};

exports.post = (url, body) => {
    return rp(generateOptions(POST, url, body));
};

exports.patch = (url, body) => {
    return rp(generateOptions(PATCH, url, body));
};
