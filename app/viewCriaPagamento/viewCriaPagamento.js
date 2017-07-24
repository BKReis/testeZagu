'use strict';

angular.module('myApp.viewCriaPagamento', ['ngRoute'])

    .controller('ViewCriaPagamentoCtrl', ["$http", "$scope", "idCartaoPagamentosService", "config", function ($http,$scope,idCartaoPagamentosService,config) {
        $scope.newPagamento = {}

        $scope.valor = '';
        
        $scope.idCartaoPagamento = idCartaoPagamentosService.idCartaoPagamento;

        $scope.sendPost = function () {
            $http({
                method: "POST",
                url: config.URL + "payments",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                data: {
                        "amount": $scope.valor,
                        "card_id": $scope.idCartaoPagamento,
                }
            }).then(function (response) {
                $scope.newPagamento = response.data;
                $scope.newPagamentoView = JSON.stringify($scope.newPagamento, null, "\t");
            }, function (response) {
                $scope.newPagamento = response.data || 'Request failed';

            });
        }
    }]);

