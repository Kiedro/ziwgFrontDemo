(function () {
    
    var registerController = function ($scope, tsffService, storage) {

        var onRegisterComplete = function () {
            $('#spinnerDiv').hide(); 
            console.log("Register complete." + response.statusText)
          //  tsffService.getToken(userdata).then(onLoginCompete, onError);
        };

        var onError = function (response) {
            alert("Błąd: " + response.data);

            console.error(response);
            $('#spinnerDiv').hide(); 
        };

        $scope.userRegisterEmail = '';
        $scope.userRegisterPassword = '';
		$scope.userRegisterConfPassword  = '';
        $scope.showRegisterBtn = function () {
            return ($scope.userRegisterPassword === $scope.userRegisterConfPassword) && ($scope.userRegisterPassword.length > 5);         
        }

        $scope.register = function () {
            $('#spinnerDiv').show(); 
             var userdata = { 
				      email: $scope.userRegisterEmail, 
				      password: $scope.userRegisterPassword};
             tsffService.registerUser(userdata).then(onRegisterComplete, onError);
        };
    }
    var app = angular.module("ziwgApp"); 
    app.controller("registerController", ["$scope", "tsffService", "storage", registerController]);
} ());