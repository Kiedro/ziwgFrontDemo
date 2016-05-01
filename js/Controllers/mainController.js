(function () {
    
    var mainController = function ($scope, tsffService, storage) {

        var token = storage.getItem("token");    
        $scope.token = token;
        // var onLoginCompete = function (token) {
        //     storage.saveItem("token", token);
        //     $('#spinnerDiv').hide(); 
        // };

        // var onError = function (response) {
        //     alert("Błąd: " + response.statusText);
        //     console.error(response);
        //     $('#spinnerDiv').hide(); 
        // }

        // $scope.userLoginEmail = "a@a.com";
        // $scope.userLoginPassword = ""; //12#Qwe"

        // $scope.login = function () {
        //      $('#spinnerDiv').show(); 
        //      var userdata = { email: $scope.userLoginEmail, password: $scope.userLoginPassword };
        //      tsffService.getToken(userdata).then(onLoginCompete, onError);
        // };
    }

    var app = angular.module("ziwgApp");    
    app.controller("mainController", ["$scope", "tsffService", "storage", mainController]);

} ());