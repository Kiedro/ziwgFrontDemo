(function () {
    var premiumController = function ($scope, storage, tsffService) {
        $scope.setPremium = function (premium) {
            tsffService.setPremium(storage.getItem("token"), premium);
        };
    }

    var app = angular.module("ziwgApp");
    app.controller("premiumController", ["$scope", "storage", "tsffService", premiumController]);
} ());