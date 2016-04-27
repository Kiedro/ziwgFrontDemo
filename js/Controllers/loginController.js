(function () {
    
    var loginController = function ($scope, tsffService, storage) {

        var onLoginCompete = function (token) {
            storage.saveItem("token", token);
            $('#spinnerDiv').hide(); 
        };

        var onError = function (response) {
            alert("Błąd: " + response.statusText);
            console.error(response);
            $('#spinnerDiv').hide(); 
        }

        $scope.userLoginEmail = "a@a.com";
        $scope.userLoginPassword = ""; //12#Qwe"

        $scope.login = function () {
             $('#spinnerDiv').show(); 
             var userdata = { email: $scope.userLoginEmail, password: $scope.userLoginPassword };
             tsffService.getToken(userdata).then(onLoginCompete, onError);
        };
    }

    var app = angular.module("ziwgApp");    
    app.controller("loginController", ["$scope", "tsffService", "storage", loginController]);

} ());