'use strict';

angular.module('myApp.viewAlteraCartao', ['ngRoute'])

    .controller('ViewAlteraCartaoCtrl', ["$http", "$scope",  "idChangeCardService","config", function ($http,$scope, idChangeCardService,config) {
        $scope.infos = {}

        $scope.numeroCartao = '';
        $scope.codigoSeguranca = '';
        $scope.nomePortador = '';
        $scope.limiteTotal = '';
        $scope.limiteDisponivel = ''; 


        $scope.idChangeCard = idChangeCardService.idChangeCard;
        
        $scope.sendGet = function () {
            $http({
                method: "GET",
                url: config.URL + "cards/" + $scope.idChangeCard,
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
                url: config.URL + "cards/" + $scope.idChangeCard,
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
                $scope.infoView = JSON.stringify($scope.info, null, "\t");
            }, function (response) {
                $scope.info = response.data || 'Request failed';

            });
        }

    }]);

