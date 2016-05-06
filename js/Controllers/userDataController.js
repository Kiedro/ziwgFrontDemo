(function () {

	var userDataController = function ($scope, tsffService, storage, NgTableParams, $location) {
		var userdata = [];

		var onComplete = function (data) {
        	console.log("Request complete. Token passed and returned values.");
        	$scope.userdata = data;        	
        };

        var tableParams = new NgTableParams(
			{}, 	
			{ dataset: userdata}
		)

		var onError = function(response) {
            console.error(response);
        }

        var getAllTeamsInfo = function() {
			tsffService.getAllTeamsInfo(storage.getItem("token")).then(onComplete, onError);
        }
        //nie wiedziałem, jak zrobić inaczej init();
        getAllTeamsInfo();
	};

	var app = angular.module("ziwgApp");
	app.controller("userDataController", ["$scope", "tsffService", "storage", "NgTableParams", "$location", userDataController]);
	
} ());