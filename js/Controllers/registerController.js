(function () {
    
    var registerController = function ($scope, tsffService, storage) {

        var onRegisterCompete = function (token) {
            storage.saveItem("token", token);
        };

        var onError = function (response) {
            alert("Błąd: " + response.statusText);
            console.error(response);
        }
		$scope.userPassMessage = 'Hasło niezgodne';
        $scope.userRegisterEmail = "a@a.com";
        $scope.userRegisterPassword = "12#Qwe";
		$scope.userRegisterConfPassword  = "12#Qwe";
		
		$scope.hideButton = function() {
			if ($scope.userRegisterPassword != $scope.userRegisterConfPassword) {
				$scope.hide = 'true';
			}
		}

        $scope.register = function () {
             var userdata = { 
				email: $scope.userRegisterEmail, 
				password: $scope.userRegisterPassword,
				confPass: $scope.userRegisterConfPassword };
             tsffService.getToken(userdata).then(onRegisterCompete, onError);
        };
    }

    var app = angular.module("ziwgApp");    
    app.controller("registerController", ["$scope", "tsffService", "storage", registerController]);

} ());