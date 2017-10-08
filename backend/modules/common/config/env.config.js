exports.config = {
    "jwt_expiration_in_seconds": 3600,
    "jwt_secret": "S4eeMMncc$$$tt",
    "port": 3500,
    "appEndpoint": "http://localhost:3500/health-check",
    "PERMISSION_LEVELS": {
        "MAX_PERMISSION": 4096,
        "ADMIN_PERMISSION": 4096,
        "REGULAR_PERMISSION": 8,
        "BASIC_PERMISSION": 1
    },
    "providers": {
        "facebook": { //create a new APP at facebook and fill up your key and secret.
            "api_key": "1518420404870730",
            "api_secret": "1d53401e5ca2768041484445e5371704",
            "callback_url": "http://localhost:3500/users/facebook/callback"
        }
    },
    "database" : {
        "host": 'localhost',
        "user": 'root',
        "password": 'root',
        "database": 'anpr_metrics',
        "connectionLimit": 10
    }
}
;