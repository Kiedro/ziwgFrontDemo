(function () {
    
    var loginController = function ($scope, tsffService, storage, $location) {

        var onLoginCompete = function (token) {
            storage.saveItem("token", token);
            $location.path('/logged');
            $('#spinnerDiv').hide(); 
        };

        var onError = function (response) {
            alert("Błąd: " + response.statusText);
            console.error(response);
            $('#spinnerDiv').hide(); 
        }

        $scope.userLoginEmail = "testuser@mail.com";
        $scope.userLoginPassword = ""; //12#Qwe"

        $scope.login = function () {
             $('#spinnerDiv').show(); 
             var userdata = { email: $scope.userLoginEmail, password: $scope.userLoginPassword };
             tsffService.getToken(userdata).then(onLoginCompete, onError);
        };
    }

    var app = angular.module("ziwgApp");    
    app.controller("loginController", ["$scope", "tsffService", "storage", "$location", loginController]);

} ());