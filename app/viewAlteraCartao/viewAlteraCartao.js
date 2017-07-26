'use strict';

angular.module('myApp.viewAlteraCartao', ['ngRoute'])

    .controller('ViewAlteraCartaoCtrl', ["$http", "$scope","$routeParams","$location", "config", function ($http,$scope,$routeParams,$location, config) {
        $scope.infos = {}

        $scope.numeroCartao = '';
        $scope.codigoSeguranca = '';
        $scope.nomePortador = '';
        $scope.limiteTotal = '';
        $scope.limiteDisponivel = ''; 
        
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
                $scope.info = response.data;
                $scope.infoView = JSON.stringify($scope.info, null, "\t");
                $scope.numeroCartao = $scope.info['number'];
                $scope.nomePortador = $scope.info['name'];
                $scope.bandeiraCartao = $scope.info['brand'];
                $scope.mesExp = $scope.info['exp_month'];
                $scope.anoExp = $scope.info['exp_year'];
                $scope.limiteTotal = $scope.info['limit'];
                $scope.limiteDisponivel = $scope.info['available_limit']; 
            }, function (response) {
                $scope.info = response.data || 'Request failed';

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
                data: {
                        "name": $scope.nomePortador,
                        "number": $scope.numeroCartao,
                        "brand": $scope.bandeiraCartao,
                        "exp_year": $scope.anoExp,
                        "exp_month":$scope.mesExp,
                        "limit": $scope.limiteTotal,
                        "available_limit": $scope.limiteDisponivel
                }
            }).then(function (response) {
                $scope.info = response.data;
                $location.path('/VisualizarCartoes');
                
            }, function (response) {
                $scope.info = response.data || 'Request failed';

            });
        }

    }]);

