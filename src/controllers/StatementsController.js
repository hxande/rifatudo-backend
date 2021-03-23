const StatementsModel = require('../models/StatementsModel');

exports.selectAllStatements = function (callback) {
    StatementsModel.selectAllStatements(callback);
};

exports.selectStatementsById = function (idStatement, callback) {
    StatementsModel.selectStatementsById(idStatement, callback);
};

exports.selectTotalValueByUser = function (idUser, callback) {
    StatementsModel.selectTotalValueByUser(idUser, callback);
};

exports.insertStatements = function (data, type, callback) {
    StatementsModel.insertStatements(data, type, callback);
};

exports.deleteStatements = function (idStatement) {
    StatementsModel.deleteStatements(idStatement);
};