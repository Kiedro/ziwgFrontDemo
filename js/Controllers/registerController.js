(function () {
    
    var registerController = function ($scope, tsffService, storage) {

        var onRegisterComplete = function (token) {
            //storage.saveItem("token", token);
            $('#spinnerDiv').hide(); 
            console.log("Register complete.")
            tsffService.getToken(userdata).then(onLoginCompete, onError);
        };

        var onError = function (response) {
            alert("Błąd: " + response.statusText);
            console.error(response);
            $('#spinnerDiv').hide(); 
        };

        $scope.userRegisterEmail = '';
        $scope.userRegisterPassword = '';
		$scope.userRegisterConfPassword  = '';
        $scope.token = '';

        $scope.register = function () {
            $('#spinnerDiv').show(); 
             var userdata = { 
				      email: $scope.userRegisterEmail, 
				      password: $scope.userRegisterPassword};

             tsffService.registerUser(userdata).then(onRegisterComplete, onError);
             
        };

        $scope.listUserTeams = function(token) {};
    }
    var app = angular.module("ziwgApp"); 
    app.controller("registerController", ["$scope", "tsffService", "storage", registerController]);

} ());