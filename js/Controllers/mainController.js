(function () {

    var mainController = function ($scope, tsffService, storage, $interval, $location, taskService) {

        (function () {
            tsffService.getWorkStatus(storage.getItem("token")).then(onInitSuccess, onError);
            console.log("init");
        } ());

        var startedWorkDate = Date.now();
        var workedTime = { hours: 0, minutes: 0, seconds: 0 };
        var stop;
        var selectedTaskId;

        function onInitSuccess(data) {
            console.log(data);
            $scope.hasActiveWork = data.activeWork;
            if ($scope.hasActiveWork) {
                startedWorkDate = new Date(data.started);//new Date(Date.parse(data.started)).toUTCString();
                // javascript traktuje przesłąną datę jako czas GMT,automatycznie korygująć go do lokalnej strefy czasoewj
                // abywyśiwetlany czas był poprawny należy wyliczyć iość dodanych minut i odjąć tę wartość
                var timeZoneDiff = startedWorkDate.getTimezoneOffset();
                startedWorkDate = new Date(startedWorkDate.getTime() + timeZoneDiff * 60000);

                stop = $interval(calculateTimeDiff, 500);
            }

            tsffService.getUserTeams(storage.getItem("token")).then(onUserTeamsFetched, onError);
        }

        function onTeamTasksFetched(data) {
            console.log("tasks", data);
            data.forEach(function (element) {
                element.selected = false;
                for (var i = 0; i < $scope.userTeams.length; i++) {
                    if ($scope.userTeams[i].id != element.teamId)
                        continue;
                    $scope.userTeams[i].tasks.push(element);
                    break;
                }
            });
        }

        function onUserTeamsFetched(data) {
            $scope.userTeams = data;
            for (var i = 0; i < $scope.userTeams.length; i++) {
                $scope.userTeams[i].tasks = [];
            }
            console.log("userTeams " + data);

            data.forEach(function (element) {
                taskService.allTeamTasks(storage.getItem("token"), element.id).then(onTeamTasksFetched, onError);
            }, this);
        }
        function workStarted() {
            $scope.hasActiveWork = true;
            startedWorkDate = Date.now();
            stop = $interval(calculateTimeDiff, 500);
        }

        function workFinished() {
            $scope.hasActiveWork = false;
        }

        function startWork() {
            tsffService.startWork(storage.getItem("token")).then(workStarted, onError);
        }

        function stopWork() {
            tsffService.stopWork(storage.getItem("token")).then(workFinished, onError);
        }

        function calculateTimeDiff() {
            var timeDiffms = Date.now() - startedWorkDate;

            var x = timeDiffms / 1000;
            workedTime.seconds = (x % 60) | 0;
            x /= 60;
            workedTime.minutes = x % 60 | 0;
            x /= 60;
            workedTime.hours = x % 60 | 0;
        }

        function cleanSelection() {
            selectedTaskId = 0;
            for (var i = 0; i < $scope.userTeams.length; i++) {
                for (var j = 0; j < $scope.userTeams[i].tasks.length; j++) {
                    $scope.userTeams[i].tasks[j].selected = false;
                }
            }
        }

        function selectTask(teamId, taskId) {
            selectedTaskId = taskId;
            for (var i = 0; i < $scope.userTeams.length; i++) {
                for (var j = 0; j < $scope.userTeams[i].tasks.length; j++) {
                    if ($scope.userTeams[i].tasks[j].id != taskId) {
                        $scope.userTeams[i].tasks[j].selected = false;
                    } else {
                        $scope.userTeams[i].tasks[j].selected = true;
                    }
                }
            }
            console.log("teamId " + teamId + "  taskId: " + taskId);
        }

        function onError(data) {
            console.log(data);
        }

        $scope.logout = function () {
            storage.removeItem("token");
            $location.path("/main");
        }

        $scope.selectTask = selectTask;
        $scope.cleanSelection = cleanSelection;

        $scope.hasActiveWork = false;
        $scope.workedTime = workedTime;

        $scope.startWork = startWork;
        $scope.stopWork = stopWork;

        $scope.userTeams = {};
    }

    var app = angular.module("ziwgApp");
    app.controller("mainController", ["$scope", "tsffService", "storage", "$interval", "$location", "taskService", mainController]);

} ());