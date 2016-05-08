
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
                templateUrl: "views/loggedUser/userOwnedTeams.html",
                controller: "userOwnedTeamsController"
            })
            .when("/logged", {
                templateUrl: "views/loggedUser/mainPanel.html",
                controller: "mainController"
            })
            .when("/logged", {
                templateUrl: "views/loggedUser/mainPanel.html",
                controller: "mainController"
            })
            .when("/createTeam", {
                templateUrl: "views/loggedUser/createTeam.html",
                controller: "manageTeamsController"
            })
            .otherwise({ redirectTo: "/main" });
    });
} ());