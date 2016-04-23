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
        };

        return {
            getToken: getToken
        };
    };

    var module = angular.module("ziwgApp");
    module.factory("tsffService", tsffService);
} ());