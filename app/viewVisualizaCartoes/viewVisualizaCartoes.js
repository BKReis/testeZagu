'use strict';

angular.module('myApp.view1', ['ngRoute'])



    .controller('ViewVisualizaCartoesCtrl', ["$http","$scope", "idChangeCardService","idCartaoPagamentosService","config", function ($http,$scope,idChangeCardService,idCartaoPagamentosService,config) {
        $scope.cards = {}

        //Responsável por deletar cartões
        $scope.deleteResponse = {};
        $scope.idDelete = '';

        $scope.sendGet = function () {
            $http({
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                url: config.URL + "cards",
            }).then(function (response) {
                $scope.cards = response.data;
                $scope.cardsView = JSON.stringify($scope.cards, null, "\t");
            }, function (response) {
                $scope.cards = response.data || 'Request failed';
            });
        }

        $scope.sendGet();

        $scope.sendDelete = function () {
            $http({
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                url: config.URL + "cards/" + $scope.idDelete,
                data: {
                        "id": $scope.idDelete
                }
            }).then(function (response) {
                $scope.deleteResponse = response.data;
                $scope.deleteResponseView = JSON.stringify($scope.deleteResponse, null, "\t");
                $scope.sendGet();
            }, function (response) {
                $scope.cards = response.data || 'Request failed';
                $scope.idDelete = '';
            });
        }

        $scope.idChangeCard = idChangeCardService.idChangeCard;

        $scope.$watch('idChangeCard',function(){
            idChangeCardService.idChangeCard = $scope.idChangeCard;
        })

        $scope.idCartaoPagamento = idCartaoPagamentosService.idCartaoPagamento;

        $scope.$watch('idCartaoPagamento',function(){
            idCartaoPagamentosService.idCartaoPagamento = $scope.idCartaoPagamento;
        });

        $scope.setIdCartaoPagamento = function(idDesejado){
            $scope.idCartaoPagamento = idDesejado;
        }

        $scope.setIdCartaoDeletado = function(idCartaoDesejado){
            $scope.idDelete = idCartaoDesejado;
            $scope.sendDelete();
        }

        $scope.setIdCartaoAlterado = function(idCartaoAlteradoDesejado){
            $scope.idChangeCard = idCartaoAlteradoDesejado;
        }

    }]);
