'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .controller('ViewCadastraCartaoCtrl', ["$http", "$scope","$location", "config", function ($http,$scope,$location,config) {
        $scope.newCard = {}

        $scope.sendPost = function () {
            $http({
                method: "POST",
                url: config.URL + "cards",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                data: $scope.newCard
            }).then(function (response) {
                $scope.newCard = response.data;
                $location.path('/VisualizarCartoes');
            }, function (response) {
                $scope.newCard = response.data || 'Request failed';

            });
        }
    }]);

