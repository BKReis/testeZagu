// MODULE

angular.module('myApp.viewHome', ['ngRoute'])

// CONTROLLER

    .controller('ViewHomeCtrl', ["$http","$window","$scope", "config", function ($http,$window,$scope, config) {
        $scope.keys = '';

        $scope.setKey = function(authenticationKey){
            $window.localStorage.removeItem("key");
            $window.localStorage.setItem("key",authenticationKey);
        }

    }]);
