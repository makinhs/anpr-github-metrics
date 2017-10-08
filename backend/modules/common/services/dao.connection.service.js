'use strict';

const mysql = require('promise-mysql'),
    sqlQyery = require('bluebird'),
    config = require('../config/env.config').config;

let pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    connectionLimit: 10
});

function getTasksConnection() {
    return taskPool.getConnection().disposer(function (connection) {
        taskPool.releaseConnection(connection);
    });
}

function getBankConnection() {
    return bankPool.getConnection().disposer(function (connection) {
        bankPool.releaseConnection(connection);
    });
}

function getConnection() {
    return pool.getConnection().disposer(function (connection) {
        pool.releaseConnection(connection);
    });
}


function executeQuery(query, queryParams = []) {
    return sqlQyery.using(getConnection(), (connection) => {
        return connection.query(query, queryParams);
    });
}

exports.patchBuilder = (queryFields, queryParams, bodyObject, field) => {
    if (bodyObject[field] || bodyObject[field] === 0) {
        queryFields.push(' `' + field + '` = ? ');
        queryParams.push(bodyObject[field]);
    }
};


exports.executeQuery = executeQuery;
