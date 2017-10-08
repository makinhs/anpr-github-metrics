let packageJson = require('../../../package.json');
let config = require('../../common/config/env.config').config;
exports.healthCheck = (req, res) => {

    // return healthCheckDao.get()
    //     .then((result) => {
            return res.status(200).send({
                "status": "online",
                "application": packageJson.name,
                "version": packageJson.version,
                "checks": {
                    "appEndpoint" : config.appEndpoint,
                    "fbRedirect" : config.providers.facebook.callback_url
                }
            });
        // }, (err) => {
        //     return res.status(200).send(200, {
        //         "status": "warning",
        //         "application": packageJson.name,
        //         "version": packageJson.version,
        //         "checks": {
        //             "database": "nok"
        //         }
        //     });
        // });

};