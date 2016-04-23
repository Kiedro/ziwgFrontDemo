(function () {
    
    var registerController = function ($scope, tsffService, storage) {

        var onRegisterComplete = function (token) {
            storage.saveItem("token", token);
        };

        var onError = function (response) {
            alert("Błąd: " + response.statusText);
            console.error(response);
        }

        $scope.userLoginEmail = "a@a.com";
        $scope.userLoginPassword = "12#Qwe";

        $scope.register = function () {
            var userdata = { 
				email: $scope.userLoginEmail, 
				password: $scope.userLoginPassword 
			};
            tsffService.getToken(userdata).then(onRegisterComplete, onError);
        };
    }

    var app = angular.module("ziwgApp");    
    app.controller("registerController", ["$scope", "tsffService", "storage", registerController]);

} ());