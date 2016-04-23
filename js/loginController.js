(function () {
    
    var loginController = function ($scope, tsffService, storage) {

        var onLoginCompete = function (token) {
            $scope.token = token;
            storage.saveItem("token", token);
        };

        var onError = function (response) {
            alert("Błąd: " + response.statusText);
            console.error(response);
        }

        $scope.userLoginEmail = "a@a.com";
        $scope.userLoginPassword = "12#Qwe";
        $scope.token = "(pusto)";

        $scope.login = function () {
             var userdata = { email: $scope.userLoginEmail, password: $scope.userLoginPassword };
             tsffService.getToken(userdata).then(onLoginCompete, onError);
        };
    }

    var app = angular.module("ziwgApp");    
    app.controller("loginController", ["$scope", "tsffService", "storage", loginController]);

} ());