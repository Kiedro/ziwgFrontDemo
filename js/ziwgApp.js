
(function () {
    var app = angular.module("ziwgApp", ["ngRoute"]);

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
            .when("/logged", {
                templateUrl: "views/loggedUser/mainPanel.html",
                controller: "mainController"
            })
            .otherwise({ redirectTo: "/main" });
    });
} ());