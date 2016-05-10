(function () {
    var teamController = function ($scope, tsffService, storage, $location, $routeParams, $uibModal, $log) {
        var teamId = $routeParams.teamId;

        function getTeamData() {
            tsffService.getTeamInfo(storage.getItem("token"), teamId).then(onGetTeamDataSuccess);
        }

        function onGetTeamDataSuccess(data) {
            console.log(data);
            $scope.team = data;
        }

        function onError(response) {
            console.error(response);
        }

        function removeUserFromTeam(userId) {
            tsffService.removeUserFromTeam(storage.getItem("token"), teamId, userId).then(getTeamData, onError);
        }

        $scope.removeUser = removeUserFromTeam;        
        $scope.team = "";

        (function init() {
            console.log("getData");
            getTeamData();
        } ());
        //////////////////////////////////


        $scope.openAddUserModal = function (size) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'addUserModal.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    teamId: function () {
                        return teamId;
                    }
                }
            });

            modalInstance.result.then(function () {
                // w ciągu sekundy użytkownik powinien zostać dodany do bazy i można odświeżyć dane, możę się zdarzyć ze nowego 
                // użytkownika jeszcze nie będzie i trzeba wtedy odświeżyć stronę
                setTimeout(getTeamData, 1000);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

        //////////////////////////////////        
    }

    var app = angular.module("ziwgApp");
    app.controller("teamController", ["$scope", "tsffService", "storage", "$location", "$routeParams", "$uibModal", "$log", teamController]);

} ());


angular.module('ziwgApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, tsffService, storage, teamId) {
    function init() {
        tsffService.getUsers(storage.getItem("token")).then(onSuccess, onError);
    }
    init();

    function onSuccess(data) {
        // console.log(data);
        // console.log("teamID:" + teamId);
        $scope.users = data;
    }
    function onError(response) {
        console.error(response);
    }
    $scope.users = [];
    $scope.selected = {
        // userId: ""
        user: {}
    };

    $scope.ok = function () {
       // console.log(teamId, $scope.selected.userId);
        tsffService.addUserToTeam(storage.getItem("token"), teamId, $scope.selected.user.id)
        $uibModalInstance.close($scope.selectedUserId);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});