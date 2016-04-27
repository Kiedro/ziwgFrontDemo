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

        var registerUser = function(userdata) {
            return $http({
                url: rootUrl + "/api/ManageUser/register",
                method: "POST",
                data: $.param({Username: userdata.email, Password: userdata.password }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                return response.data.message;
            });  

        }


        var getUserTeams = function(userdata, token) {
            return $http({
                url: rootUrl + "/api/user/userTeams",
                method: "GET",
                headers: { "Authorization": 'Bearer'  + token}
            }).then(function (response)  {
                return response.data.name;
            });
        };

        return {
            getToken: getToken,
            getUserTeams: getUserTeams,
            registerUser: registerUser
        };


    };

    var module = angular.module("ziwgApp");
    module.factory("tsffService", tsffService);
} ());