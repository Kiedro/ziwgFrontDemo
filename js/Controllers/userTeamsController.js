(function () {

	var userTeamsController = function ($scope, tsffService, storage, NgTableParams) {
		
		var data =
		 [ {name: "Maciek", age: 23}, 
		   {name: "Jacek" , age: 20} /*,*/ ];

		var tableParams = new NgTableParams(
			{}, 
			{ dataset: data}
		);
	};

	var app = angular.module("ziwgApp");
	app.controller("userTeamsController", ["$scope", "tsffService", "storage", "NgTableParams", userTeamsController]);
	//not sure about line below
	//userTeamsController.$inject = ["NgTableParams", "data"];

} ());