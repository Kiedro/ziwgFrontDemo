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
                // on modal dismis?
            });
        };
    }

    var app = angular.module("ziwgApp");
    app.controller("taskController", ["$scope", "taskService", "storage", "$routeParams", "$uibModal", taskController]);
} ());


angular.module('ziwgApp').controller('TaskModalInstanceCtrl', function ($scope, $uibModalInstance, taskService, tsffService, storage, teamId) {
    function init() {
       // tsffService.getUsers(storage.getItem("token")).then(onSuccess, onError);
    }
    init();

    function onSuccess(data) {
    }
    function onError(response) {
        console.error(response);
    }


    $scope.ok = function () {
        var task = { teamId: teamId, name: $scope.name, description: $scope.description, completed: false };
        taskService.createTask(storage.getItem("token"), task)
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.name;
    $scope.description;
});