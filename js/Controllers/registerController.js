(function () {

    var registerController = function ($scope, tsffService, storage, $location) {

        var userdata = {};
        
        var onRegisterComplete = function () {
            console.log("Register complete")
            tsffService.getToken(userdata).then(onLoginCompete, onError);
        };

        var onLoginCompete = function (token) {
            storage.saveItem("token", token);
            $location.path('/logged');
            $('#spinnerDiv').hide();
        };

        var onError = function (response) {
            alert("Błąd: " + response.data);

            console.error(response);
            $('#spinnerDiv').hide();
        };

        $scope.userRegisterEmail = '';
        $scope.userRegisterPassword = '';
        $scope.userRegisterConfPassword = '';
        $scope.showRegisterBtn = function () {
            return ($scope.userRegisterPassword === $scope.userRegisterConfPassword) && ($scope.userRegisterPassword.length > 5);
        }

        $scope.register = function () {
            $('#spinnerDiv').show();
            userdata = {
                email: $scope.userRegisterEmail,
                password: $scope.userRegisterPassword
            };
            tsffService.registerUser(userdata).then(onRegisterComplete, onError);
        };
    }
    var app = angular.module("ziwgApp");
    app.controller("registerController", ["$scope", "tsffService", "storage", "$location", registerController]);
} ());