(function () {

	var userDataController = function ($scope, tsffService, storage, NgTableParams, $location) {
		$scope.newTeamName = '';
		$scope.delTeamName = '';
		var userdata = [];

		var onCompleteGetTeams = function (data) {
        	console.log("Request complete. Token passed and returned values.");
        	$scope.userdata = data;        	
        };

        var onCompleteAddTeams = function (data) {
        	console.log("Request complete. Team named \"" + data.name + "\" added.");
        	$scope.tableParams.reload();
        	getAllTeamsInfo();
        	//$scope.userdata = data;        	        	
        };

        var onCompleteDelTeams  = function (data) {
        	console.log("Request complete. Team named \"" + data.name + "\" deleted.");
        	$scope.tableParams.reload();
        	getAllTeamsInfo();
        	//$scope.userdata = data;        	        	
        };

        $scope.tableParams = new NgTableParams(
			{}, 	
			{ dataset: userdata}
		);

		var onError = function(response) {
            console.error(response);
        };

        var getAllTeamsInfo = function() {
        	tsffService.getAllTeamsInfo(storage.getItem("token")).then(onCompleteGetTeams, onError);
        };

        $scope.addTeam = function() {
        	console.log("Add team clicked with param: " + $scope.newTeamName);
        	tsffService.addTeam(storage.getItem("token"), $scope.newTeamName).then(onCompleteAddTeams, onError);
        };

        $scope.delTeam = function() {
        	console.log("Trzeba dobrać się do ID po nazwie najpierw!!!")
        	console.log("Delete team named: " + $scope.delTeamName);
        	tsffService.deleteTeam(storage.getItem("token"), $scope.delTeamName).then(onCompleteDelTeams, onError);
        };
        //nie wiedziałem, jak zrobić inaczej init();
        getAllTeamsInfo();
	};

	var app = angular.module("ziwgApp");
	app.controller("userDataController", ["$scope", "tsffService", "storage", "NgTableParams", "$location", userDataController]);
} ());