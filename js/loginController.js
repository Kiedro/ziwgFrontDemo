(function () {
    var app = angular.module("ziwgApp");

    var loginController = function ($scope, $http) {

        var onLoginCompete = function (response) {
            console.log(response.data.access_token);
            $scope.token = response.data.access_token;
        };

        var onError = function (response) {
            console.log(response);
        }

        $scope.userLoginEmail = "a@a.com";
        $scope.userLoginPassword = "12#Qwe";
        $scope.token = "(pusto)";

        $scope.login = function () {
            console.log($scope.userLoginEmail + " " + $scope.userLoginPassword);

            $http({
                url: rootUrl + "/token",
                method: "POST",
                data: $.param({ grant_type: 'password', username: $scope.userLoginEmail, password: $scope.userLoginPassword }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(onLoginCompete, onError);
        };
    }

    app.controller("loginController", ["$scope", "$http", loginController]);

} ());