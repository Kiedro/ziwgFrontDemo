(function () {

    var taskController = function ($scope, taskService, storage, $routeParams, $uibModal) {
        var teamId = $routeParams.teamId;

        function onSuccess(data) {
            console.log(data);
            $scope.tasks = data;
        }

        function onError(response) {
            console.error(response);
        }

        function getAllTasks() {
            taskService.allTeamTasks(storage.getItem("token"), teamId).then(onSuccess, onError);
        }

        function createTask(name, description) {
            var task = { Name: name, Description: description, TeamId: teamId, Completed: false };

            taskService.createTask(storage.getItem("token"), task).then(onSuccess, onError);
        }

        $scope.newTaskButtonClick = function newTaskButtonClick() {
            createTask($scope.name, $scope.description)
        }

        $scope.tasks;
        $scope.description;
        $scope.name;

        (function init() {
            getAllTasks();
        } ());

        /////////////////////
        $scope.openAddTaskModal = function () {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'addTaskModal.html',
                controller: 'TaskModalInstanceCtrl',
                resolve: {
                    teamId: function () {
                        return teamId;
                    }
                }
            });

            modalInstance.result.then(function () {
                // w ciągu sekundy użytkownik powinien zostać dodany do bazy i można odświeżyć dane, możę się zdarzyć ze nowego 
                // użytkownika jeszcze nie będzie i trzeba wtedy odświeżyć stronę
                setTimeout(getAllTasks, 1000);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }

    var app = angular.module("ziwgApp");
    app.controller("taskController", ["$scope", "taskService", "storage", "$routeParams", "$uibModal", taskController]);
} ());


angular.module('ziwgApp').controller('TaskModalInstanceCtrl', function ($scope, $uibModalInstance, taskService, storage, teamId) {
    function init() {
       // tsffService.getUsers(storage.getItem("token")).then(onSuccess, onError);
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