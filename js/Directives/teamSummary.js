(function () {

	var teamSummary = function () {
		return {
			templateUrl: "views/partials/teamSummary.html"
		}
	};

	var app = angular.module("ziwgApp");
	app.directive("teamSummary", [teamSummary]);

} ());