(function () {
    var storage = function ($http) {

        var saveItem = function (key, data) {
            localStorage.setItem(key, data);
        };

        var getItem = function (key) {
            return localStorage.getItem(key);
        }

        return {
            saveItem: saveItem,
            getItem: getItem
        };
    };

    var module = angular.module("ziwgApp");
    module.factory("storage", storage);
} ());