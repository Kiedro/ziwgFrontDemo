(function () {
    var taskService = function ($http) {

        var allTeamTasks = function (token, teamId) {
            return $http({
                url: rootUrl + "/api/team/" + teamId + "/tasks",
                method: "GET",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        }

        var markTaskAsCompleted = function (token, taskId) {
            return $http({
                url: rootUrl + "/api/tasks/" + taskId + "/markCompleted",
                method: "Post",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        }

        var getTask = function (token, taskId) {
            return $http({
                url: rootUrl + "/api/tasks/" + taskId,
                method: "GET",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        }

        var createTask = function (token, task) {
            return $http({
                url: rootUrl + "/api/tasks/",
                method: "POST",
                headers: { "Authorization": 'Bearer ' + token },
                data: task
            }).then(function (response) {
                return response.data;
            });
        }

        var deleteTask = function (token, taskId) {
            return $http({
                url: rootUrl + "/api/tasks/" + taskId,
                method: "DELETE",
                headers: { "Authorization": 'Bearer ' + token },
                data: task
            }).then(function (response) {
                return response.data;
            });
        }

        return {
            allTeamTasks: allTeamTasks,
            markTaskAsCompleted: markTaskAsCompleted,
            getTask: getTask,
            createTask: createTask,
            deleteTask: deleteTask
        }
    }

    var module = angular.module("ziwgApp");
    module.factory("taskService", taskService);
} ());