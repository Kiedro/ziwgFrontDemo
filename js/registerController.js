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
		$scope.inputConfPassword = "";
		$scope.message = "";
		
		$scope.submit = function(isValid) {
		  console.log("h");
		  if (isValid) {
			$scope.message = "Submitted " + $scope.userLoginEmail;
		  } else {
			$scope.message = "There are still invalid fields below.";
		  }
		};
		
		var compareTo = function(password) {
		  return {
			require: "ngModel",
			scope: {
				otherModelValue: "=compareTo"
			},
			link: function(scope, element, attributes, ngModel) {
			  
			  ngModel.$validators.compareTo = function(modelValue) {
				return modelValue == scope.otherModelValue;
			};

			scope.$watch("otherModelValue", function() {
			  ngModel.$validate();
			});
		  }
		};
	  };

        $scope.register = function () {
            var userdata = { 
				email: $scope.userLoginEmail, 
				password: $scope.userLoginPassword 
			};
            tsffService.getToken(userdata).then(onRegisterComplete, onError);
        };
    }
	var app = angular.module("ziwgApp");
	app.directive("compareTo", compareTo);
    app.controller("registerController", ["$scope", "tsffService", "storage",  registerController]);

	
} ());