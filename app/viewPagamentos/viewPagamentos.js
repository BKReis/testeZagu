'use strict';

angular.module('myApp.viewPagamentos', ['ngRoute'])



    .controller('ViewPagamentosCtrl', ["$http","$scope", "$routeParams","cardsServicesRequests","paymentsServicesRequests","config", function ($http,$scope,$routeParams,cardsServicesRequests,paymentsServicesRequests,config) {
        $scope.payments = {}
        $scope.card = {}
        $scope.deleteResponse = {}

        $scope.getCard= function(idFromCardToGet) {
            cardsServicesRequests.getCard(idFromCardToGet).then(function(response){
                $scope.card = response.data;
            },function(error){ 
                $scope.card = error.data || 'Request failed';
            
            });
        }

        $scope.getPayments= function(cardId) {
            paymentsServicesRequests.getPayments(cardId).then(function(response){
                $scope.payments = response.data;
            },function(error){ 
                $scope.payments = error.data || 'Request failed';
            
            });
        }
        
        $scope.getCard($routeParams.idCard);
        $scope.getPayments($routeParams.idCard);

        $scope.deletePayment = function(payment){
            payment.disable = true;
            paymentsServicesRequests.deletePayment(payment.id).then(function(response){
                $scope.deleteResponse = response.data;
                $scope.getPayments($routeParams.idCard);
                $scope.getCard($routeParams.idCard)
            },function(error){
                $scope.deleteResponse = error.data || 'Request failed';
                payment.disable = false;
            });
        }
    }]);
