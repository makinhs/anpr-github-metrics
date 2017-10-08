let concat = require('concat-stream');

exports.concatBinary = (req, res, next) => {
    req.pipe(concat(function (data) {
        req.body = data;
        next();
    }));
};