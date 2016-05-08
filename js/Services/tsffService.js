(function () {
    var tsffService = function ($http) {

        var getToken = function (userdata) {
            return $http({
                url: rootUrl + "/token",
                method: "POST",
                data: $.param({ grant_type: 'password', username: userdata.email, password: userdata.password }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                return response.data.access_token;
            });
        }

        var registerUser = function (userdata) {
            return $http({
                url: rootUrl + "/api/ManageUser/register",
                method: "POST",
                data: $.param({ Username: userdata.email, Password: userdata.password }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                return response.data.message;
            });
        };

        var getAllTeamsInfo = function (token) {
            return $http({
                url: rootUrl + "/api/Teams",
                method: "GET",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        };

        var getWorkStatus = function (token) {
            return $http({
                url: rootUrl + "/api/work/status",
                method: "GET",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        };

        var getUserTeams = function (token) {
            return $http({
                url: rootUrl + "/api/user/userTeams",
                method: "GET",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        };

        var getOwnedTeams = function (token) {
            return $http({
                url: rootUrl + "/api/user/ownedTeams",
                method: "GET",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        };



        var getUserDetails = function (token) {
            return $http({
                url: rootUrl + "/api/work/status",
                method: "GET",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        };

        var getWorkStatus = function (token) {
            return $http({
                url: rootUrl + "/api/work/status",
                method: "GET",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        };

        var startWork = function (token) {
            return $http({
                url: rootUrl + "/api/work/start",
                method: "POST",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        };

        var stopWork = function (token) {
            return $http({
                url: rootUrl + "/api/work/stop",
                method: "POST",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        };

        var deleteTeam = function (token, teamId) {
            return $http({
                url: rootUrl + "/api/teams/" + teamId,
                method: "DELETE",
                headers: { "Authorization": 'Bearer ' + token }
            }).then(function (response) {
                return response.data;
            });
        }

        return {
            getToken: getToken,
            getAllTeamsInfo: getAllTeamsInfo,
            registerUser: registerUser,
            getWorkStatus: getWorkStatus,
            startWork: startWork,
            stopWork: stopWork,
            getUserTeams: getUserTeams,
            getOwnedTeams: getOwnedTeams,
            deleteTeam: deleteTeam
        };
    };

    var module = angular.module("ziwgApp");
    module.factory("tsffService", tsffService);
} ());