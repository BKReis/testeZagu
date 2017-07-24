'use strict';

angular.module('myApp.viewPagamentos', ['ngRoute'])



    .controller('ViewPagamentosCtrl', ["$http","$scope","idCartaoPagamentosService","idPagamentoAlteraService","config", function ($http,$scope,idCartaoPagamentosService,idPagamentoAlteraService,config) {
        $scope.pagamentos = {}

        $scope.idCartaoPagamento = idCartaoPagamentosService.idCartaoPagamento;

        $scope.sendGet = function () {
            $http({
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                url: config.URL + "cards/" + $scope.idCartaoPagamento,
            }).then(function (response) {
                $scope.cards = response.data;
                $scope.cardsView = JSON.stringify($scope.cards, null, "\t");
            }, function (response) {
                $scope.cards = response.data || 'Request failed';
            });
        }

        $scope.sendGetPagamento = function () {
            $http({
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                url: config.URL + "cards/" + $scope.idCartaoPagamento +"/payments" ,
            }).then(function (response) {
                $scope.pagamentos = response.data;
                $scope.pagamentosView = JSON.stringify($scope.pagamentos, null, "\t");
            }, function (response) {
                $scope.pagamentos = response.data || 'Request failed';
            });
        }

        $scope.sendGet();
        $scope.sendGetPagamento();

        $scope.sendDelete = function () {
            $http({
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                url: config.URL + "payments/" + $scope.idPagamentoDelete,
                data: {
                }
            }).then(function (response) {
                $scope.deleteResponse = response.data;
                $scope.deleteResponseView = JSON.stringify($scope.deleteResponse, null, "\t");
                $scope.sendGetPagamento();
            }, function (response) {
                $scope.deleteResponse = response.data || 'Request failed';
                $scope.idDelete = '';
            });
        }


        $scope.idAlterarPagamento = idPagamentoAlteraService.idAlterarPagamento;

        $scope.$watch('idAlterarPagamento',function(){
            idPagamentoAlteraService.idAlterarPagamento = $scope.idAlterarPagamento;
        })

//        $scope.statusPagamentoAltera = idPagamentoAlteraService.statusPagamentoAltera;
//
//        $scope.$watch('statusPagamentoAltera',function(){
//            idPagamentoAlteraService.statusPagamentoAltera = $scope.statusPagamentoAltera;
//        })

        $scope.setIdPagamentoDeletado = function(idPagamentoDesejado){
            $scope.idPagamentoDelete = idPagamentoDesejado;
            $scope.sendDelete();
        }

        $scope.setIdPagamentoAlterado = function(idPagamentoDesejado){
            $scope.idAlterarPagamento = idPagamentoDesejado;
        }


    }]);
