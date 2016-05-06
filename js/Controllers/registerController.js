(function () {
    
    var registerController = function ($scope, tsffService, storage) {

        var onRegisterComplete = function (response) {
            //storage.saveItem("token", token);
            console.log("Register complete." + response.statusText)
            tsffService.getToken(userdata).then(onLoginCompete, onError);
        };

        var onError = function (response) {
            alert("Błąd: " + response.data);

            console.error(response);
        };

        $scope.userRegisterEmail = '';
        $scope.userRegisterPassword = '';
		$scope.userRegisterConfPassword  = '';
        $scope.token = '';

        $scope.register = function () {
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