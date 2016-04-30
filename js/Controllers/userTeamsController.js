(function () {

	var userTeamsController = function ($scope, tsffService, storage, NgTableParams) {
		var data =
		 [ {name: "Maciek", age: 23}, 
		   {name: "Jacek" , age: 20} /*,*/ ];

		var tableParams = new NgTableParams(
			{}, 
			{ dataset: data}
		);
		$scope.users = data;
	};

	var app = angular.module("ziwgApp");
	app.controller("userTeamsController", ["$scope", "tsffService", "storage", "NgTableParams", userTeamsController]);
} ());