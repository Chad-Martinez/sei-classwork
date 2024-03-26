"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPastDue = exports.isGradeable = exports.getAvgs = exports.addNums = void 0;
var addNums = function (numArr) {
    return numArr.reduce(function (acc, curr) { return acc + curr; }, 0);
};
exports.addNums = addNums;
var getAvgs = function (numArr, denomArr) { return (0, exports.addNums)(numArr) / (0, exports.addNums)(denomArr); };
exports.getAvgs = getAvgs;
var isGradeable = function (dueDate) {
    return Date.parse(dueDate) <= Date.now();
};
exports.isGradeable = isGradeable;
var isPastDue = function (dateSubmitted, dateDue) {
    return Date.parse(dateSubmitted) > Date.parse(dateDue);
};
exports.isPastDue = isPastDue;
