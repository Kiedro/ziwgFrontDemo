
(function () {
    var app = angular.module("ziwgApp", ["ngRoute", "ngTable"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "views/main.html"
            })
            .when("/login", {
                templateUrl: "views/login.html",
                controller: "loginController"
            })
            .when("/register", {
                templateUrl: "views/register.html",
                controller: "registerController"
            })
            .when("/userTeams", {
                templateUrl: "views/userTeams.html",
                controller: "userTeamsController"
            })
            .otherwise({ redirectTo: "/main" });
    });
} ());