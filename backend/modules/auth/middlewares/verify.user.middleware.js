const crypto = require('crypto');
exports.hasValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(', ')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({error: 'Missing e-mail and password field'});
    }


};

exports.isPasswordAndUserMatch = (req, res, next) => {
    // return userDao.findByEmail(req.body.email)
    //     .then((user) => {
    //         if (user !== undefined) {
    //             let passwordFields = user.password.split('$');
    //             let salt = passwordFields[0];
    //             let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    //             if (hash === passwordFields[1]) {
    //                 req.body = {
    //                     userId: user.id,
    //                     email: user.email,
    //                     permissionLevel: user.permissionLevel,
    //                     provider: 'email',
    //                     name: user.firstName,
    //                 };
    //                 return next();
    //             } else {
    //                 return res.status(400).send({errors: ['Invalid e-mail or password']});
    //             }
    //         } else {
    //             return res.status(400).send({errors: ['Invalid e-mail or password']});
    //         }
    //
    //     });
};