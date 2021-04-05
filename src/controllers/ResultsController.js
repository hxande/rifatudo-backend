const ResultsModel = require('../models/ResultsModel');

exports.selectLastResults = function (callback) {
    ResultsModel.selectLastResults(callback);
};

exports.selectAllResults = function (callback) {
    ResultsModel.selectAllResults(callback);
};

exports.selectIdResults = function (idResults, callback) {
    ResultsModel.selectIdResults(idResults, callback);
};

exports.deleteResults = function (idResults) {
    ResultsModel.deleteResults(idResults);
};