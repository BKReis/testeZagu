'use strict';

angular.module('myApp.viewAlteraStatusPagamento', ['ngRoute'])

    .controller('ViewAlteraStatusPagamentoCtrl', ["$http", "$scope","$routeParams","$location", "config", function ($http,$scope,$routeParams,$location, config) {
        $scope.alteraPagamento = {}
        $scope.payment = {}

        //$scope.statusPagamentoAltera = idPagamentoAlteraService.statusPagamentoAltera;

        $scope.sendGet = function () {
            $http({
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                url: config.URL + "payments/" + $routeParams.idPayment,
            }).then(function (response) {
                $scope.payment = response.data;
                $scope.paymentView = JSON.stringify($scope.payment, null, "\t");
            }, function (response) {
                $scope.payment = response.data || 'Request failed';
            });
        }

        
        $scope.sendGet();

        $scope.sendPatch = function () {
            $http({
                method: "PATCH",
                url: config.URL + "payments/" + $routeParams.idPayment,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                data: {
                        "id" : $scope.idAlterarPagamento,
                        "amount" : $scope.payment.amount,
                        "date" : $scope.payment.date,
                        "status" : $scope.payment.status
                }
            }).then(function (response) {
                $scope.alteraPagamento = response.data;
                $scope.alteraPagamentoView = JSON.stringify($scope.alteraPagamento, null, "\t");
                $location.path('/VisualizarPagamentos/' + $scope.payment.card_id);
            }, function (response) {
                $scope.alteraPagamento = response.data || 'Request failed';

            });
        }

    }]);
