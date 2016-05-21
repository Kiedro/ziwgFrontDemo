(function () {
    var manageTeamsController = function ($scope, tsffService, storage, $location) {
               
        var onCreateSuccess = function (token) {
            $location.path('/userTeams');
            $('#spinnerDiv').hide();
        };

        var onError = function (response) {
            alert("Błąd: " + response.statusText);
            console.error(response);
            $('#spinnerDiv').hide();
        }        

        $scope.createTeam = function (teamName) {
            // jeżeli nazwa nie jest pusta
            if (teamName) {
                $('#spinnerDiv').show();
                tsffService.createTeam(storage.getItem("token"), teamName).then(onCreateSuccess, onError);
            }
        };
    }

    var app = angular.module("ziwgApp");
    app.controller("manageTeamsController", ["$scope", "tsffService", "storage", "$location", manageTeamsController]);

} ());