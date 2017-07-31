'use strict';

angular.module('myApp.viewCriaPagamento', ['ngRoute'])

    .controller('ViewCriaPagamentoCtrl', ["$http", "$scope", "$location","$routeParams","paymentsServicesRequests", "config", function ($http,$scope,$location,$routeParams,paymentsServicesRequests,config) {
        $scope.newPayment= {}

        $scope.newPayment.card_id = $routeParams.idCard;

        $scope.createPayment = function(newPayment){
            var copyPayment = angular.copy(newPayment)
            copyPayment.amount = parseInt(copyPayment.amount*100);
            paymentsServicesRequests.createPayment(copyPayment).then(function(response){
                $scope.newPayment = response.data;
                $location.path('/VisualizarPagamentos/' + $scope.newPayment.card_id)
            },function(error){
                $scope.newPayment.errors = error.data || 'Request failed';
            });
        }
    }]);

