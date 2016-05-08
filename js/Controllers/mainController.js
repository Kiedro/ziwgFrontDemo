(function () {

    var mainController = function ($scope, tsffService, storage, $interval, $location) {

        (function () {
            tsffService.getWorkStatus(storage.getItem("token")).then(onInitSuccess, onError);
            console.log("init");
        }());

        var startedWorkDate = Date.now();
        var workedTime = { hours: 0, minutes: 0, seconds: 0 };
        var stop;

        function onInitSuccess(data) {
            console.log(data);
            $scope.hasActiveWork = data.activeWork;
            if ($scope.hasActiveWork) {
                startedWorkDate = new Date(data.started);
                stop = $interval(calculateTimeDiff, 500);
            }

            tsffService.getUserTeams(storage.getItem("token")).then(onUserTeamsFetched, onError);
        }


        function onUserTeamsFetched(data) {
            $scope.userTeams = data;
            console.log("userTeams " + data);
            console.log(data);
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

        function onError(data) {
            console.log(data);
        }

        $scope.logout = function () {
            storage.removeItem("token");
            $location.path("/main");
        }

        $scope.hasActiveWork = false;
        $scope.workedTime = workedTime;

        $scope.startWork = startWork;
        $scope.stopWork = stopWork;

        $scope.userTeams = {};
    }

    var app = angular.module("ziwgApp");
    app.controller("mainController", ["$scope", "tsffService", "storage", "$interval", "$location", mainController]);

} ());