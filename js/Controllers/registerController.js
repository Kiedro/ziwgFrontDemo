(function () {
    
    var registerController = function ($scope, tsffService, storage) {

        var onRegisterCompete = function (token) {
            storage.saveItem("token", token);
        };

        var onError = function (response) {
            alert("Błąd: " + response.statusText);
            console.error(response);
        }
        $scope.userRegisterEmail = ' ';
        $scope.userRegisterPassword = ' ';
		    $scope.userRegisterConfPassword  = ' ';

        $scope.register = function () {
             var userdata = { 
				      email: $scope.userRegisterEmail, 
				      password: $scope.userRegisterPassword};
             tsffService.getToken(userdata).then(onRegisterCompete, onError);
        };
        $scope.token = $scope.userdata		
    }
    var app = angular.module("ziwgApp"); 
    app.controller("registerController", ["$scope", "tsffService", "storage", registerController]);

} ());
