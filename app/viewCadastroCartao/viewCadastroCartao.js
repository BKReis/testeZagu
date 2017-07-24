'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .controller('ViewCadastraCartaoCtrl', ["$http", "$scope","$location", "config", function ($http,$scope,$location,config) {
        $scope.newCard = {}

        $scope.numeroCartao = '';
        $scope.anoExp = '';
        $scope.mesExp = '';
        $scope.nomePortador = '';
        $scope.limiteTotal = '';
        $scope.bandeiraCartao = '';

        $scope.sendPost = function () {
            $http({
                method: "POST",
                url: config.URL + "cards",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                data: {
                        "number": $scope.numeroCartao,
                        "brand": $scope.bandeiraCartao,
                        "exp_year": $scope.anoExp,
                        "exp_month": $scope.mesExp,
                        "limit": $scope.limiteTotal,
                        "name": $scope.nomePortador
                }
            }).then(function (response) {
                $scope.newCard = response.data;
                $scope.newCardView = JSON.stringify($scope.newCard, null, "\t");
                $location.path('/VisualizarCartoes');
            }, function (response) {
                $scope.newCard = response.data || 'Request failed';

            });
        }
    }]);

