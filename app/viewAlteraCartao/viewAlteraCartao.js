'use strict';

angular.module('myApp.viewAlteraCartao', ['ngRoute'])

    .controller('ViewAlteraCartaoCtrl', ["$http", "$scope","$routeParams","$location", "config", function ($http,$scope,$routeParams,$location, config) {
        $scope.infoCartao = {}

        
        $scope.sendGet = function () {
            $http({
                method: "GET",
                url: config.URL + "cards/" + $routeParams.idCard,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                data: {
                        "id": $scope.idChangeCard
                }
            }).then(function (response) {
                $scope.infoCartao = response.data; 
            }, function (response) {
                $scope.infoCartao = response.data || 'Request failed';

            });
        }

        $scope.sendGet();

        $scope.sendPatch = function () {
            $http({
                method: "PATCH",
                url: config.URL + "cards/" + $routeParams.idCard,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                data: $scope.infoCartao 
            }).then(function (response) {
                $scope.info = response.data;
                $location.path('/VisualizarCartoes');
                
            }, function (response) {
                $scope.info = response.data || 'Request failed';

            });
        }


        $scope.months = _.range(1,13);
        $scope.years = _.range(2017,2030);

    }]);

