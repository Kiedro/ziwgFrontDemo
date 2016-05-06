(function () {
    var storage = function ($http) {

        var saveItem = function (key, data) {
            localStorage.setItem(key, data);
        };

        var getItem = function (key) {
            return localStorage.getItem(key);
        }

        var removeItem = function (key) {
            localStorage.removeItem("token");
        }

        return {
            saveItem: saveItem,
            getItem: getItem,
            removeItem: removeItem
        };
    };

    var module = angular.module("ziwgApp");
    module.factory("storage", storage);
} ());