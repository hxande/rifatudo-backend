const DisputesModel = require('../models/DisputesModel');

exports.insertDisputes = function (data, callback) {
    DisputesModel.insertDisputes(data, callback);
};

exports.selectAllDisputes = function (callback) {
    DisputesModel.selectAllDisputes(callback);
};

exports.selectIdDisputes = function (idResults, callback) {
    DisputesModel.selectIdDisputes(idResults, callback);
};

exports.deleteDisputes = function (idResults) {
    DisputesModel.deleteDisputes(idResults);
};