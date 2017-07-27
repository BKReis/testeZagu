'use strict';

angular.module('myApp.viewPagamentos', ['ngRoute'])



    .controller('ViewPagamentosCtrl', ["$http","$scope", "$routeParams", "idCartaoPagamentosService","idPagamentoAlteraService","cardsServicesRequests","config", function ($http,$scope,$routeParams,idCartaoPagamentosService,idPagamentoAlteraService,cardsServicesRequests,config) {
        $scope.pagamentos = {}
        $scope.card = {}

        $scope.idCartaoPagamento = idCartaoPagamentosService.idCartaoPagamento;


        $scope.getCard= function(idFromCardToGet) {
            cardsServicesRequests.getCard(idFromCardToGet).then(function(response){
                $scope.card = response.data;
            },function(error){ 
                $scope.card = response.data || 'Request failed';
            
            });
        }

        $scope.sendGetPagamento = function () {
            $http({
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                url: config.URL + "cards/" + $routeParams.idCard +"/payments" ,
            }).then(function (response) {
                $scope.pagamentos = response.data;
                $scope.pagamentosView = JSON.stringify($scope.pagamentos, null, "\t");
            }, function (response) {
                $scope.pagamentos = response.data || 'Request failed';
            });
        }

        $scope.getCard($routeParams.idCard);
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


        // $scope.idAlterarPagamento = idPagamentoAlteraService.idAlterarPagamento;

        // $scope.$watch('idAlterarPagamento',function(){
        //     idPagamentoAlteraService.idAlterarPagamento = $scope.idAlterarPagamento;
        // })

//        $scope.statusPagamentoAltera = idPagamentoAlteraService.statusPagamentoAltera;
//
//        $scope.$watch('statusPagamentoAltera',function(){
//            idPagamentoAlteraService.statusPagamentoAltera = $scope.statusPagamentoAltera;
//        })

        $scope.setIdPagamentoDeletado = function(idPagamentoDesejado){
            $scope.idPagamentoDelete = idPagamentoDesejado;
            $scope.sendDelete();
        }

        // $scope.setIdPagamentoAlterado = function(idPagamentoDesejado){
        //     $scope.idAlterarPagamento = idPagamentoDesejado;
        // }


    }]);
