(function () {

    var taskController = function ($scope, taskService, storage, $routeParams) {
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

        $scope.newTaskButtonClick =  function newTaskButtonClick() {
            createTask($scope.name, $scope.description)
        }
        
        $scope.tasks;
        $scope.description;
        $scope.name;

        (function init() {
            getAllTasks();
        } ());
    }

    var app = angular.module("ziwgApp");
    app.controller("taskController", ["$scope", "taskService", "storage", "$routeParams", taskController]);
} ());