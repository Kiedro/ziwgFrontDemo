(function () {

	var userOwnedTeamsController = function ($scope, tsffService, storage, NgTableParams, $location) {
		var ownedTeams = [];

		var onComplete = function (data) {
			console.log("Request complete. Token passed and returned values.");
			$scope.ownedTeams = data;
			console.log(data);
        };

        var tableParams = new NgTableParams(
			{},
			{ dataset: ownedTeams }
		)

		var onError = function (response) {
            console.error(response);
        }

        var getOwnedTeamsInfo = function () {
			tsffService.getOwnedTeams(storage.getItem("token")).then(onComplete, onError);
        }

		function deleteTeam(teamId) {
			tsffService.deleteTeam(storage.getItem("token"), teamId).then(getOwnedTeamsInfo, onError);
		}

		$scope.deleteTeam = deleteTeam;
        //nie wiedziałem, jak zrobić inaczej init();
		// można jeszcze (function(){tu zawartosc funckji})(); - to się od razu wykona, ale tak jak zrobiłeś jest chyba czytelniej
        getOwnedTeamsInfo();
	};

	var app = angular.module("ziwgApp");
	app.controller("userOwnedTeamsController", ["$scope", "tsffService", "storage", "NgTableParams", "$location", userOwnedTeamsController]);

} ());