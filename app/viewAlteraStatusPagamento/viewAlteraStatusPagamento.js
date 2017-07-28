'use strict';

angular.module('myApp.viewAlteraStatusPagamento', ['ngRoute'])

    .controller('ViewAlteraStatusPagamentoCtrl', ["$http", "$scope","$routeParams","$location","paymentsServicesRequests", "config", function ($http,$scope,$routeParams,$location, paymentsServicesRequests, config) {
        $scope.payment = {}
        $scope.patchResponse = {}

        $scope.getPayment= function(paymentId) {
            paymentsServicesRequests.getPayment(paymentId).then(function(response){
                $scope.payment = response.data;
            },function(error){ 
                $scope.payment = error.data || 'Request failed';
            
            });
        }
        
        $scope.getPayment($routeParams.idPayment);

        
        $scope.updatePayment= function(payment) {
            paymentsServicesRequests.updatePayment(payment).then(function(response){
                $scope.patchResponse = response.data;
                $location.path('/VisualizarPagamentos/' + $scope.payment.card_id);
            },function(error){ 
                $scope.patchResponse = error.data || 'Request failed';
            });
        }
    }]);
