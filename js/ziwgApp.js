
(function () {
    var app = angular.module("ziwgApp", ["ngRoute", "ngTable", "ngAnimate", "ui.bootstrap", "ngAria", "ngMaterial"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "views/main.html",
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
            .when("/createTeam", {
                templateUrl: "views/loggedUser/createTeam.html",
                controller: "manageTeamsController"
            })
            .when("/team/:teamId", {
                templateUrl: "views/loggedUser/team/team.html",
                controller: "teamController"
            })
            .when("/team/:teamId/tasks", {
                templateUrl: "views/loggedUser/tasks/tasks.html",
                controller: "taskController"
            })
            .when("/premium", {
                templateUrl: "views/premium.html",
                controller: "premiumController"
            })
            .otherwise({ redirectTo: "/main" });
    });
} ());