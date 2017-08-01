'use strict';

angular.module('myApp.viewPagamentos', ['ngRoute'])



    .controller('ViewPagamentosCtrl', ["$http","$scope", "$routeParams","$uibModal","cardsServicesRequests","paymentsServicesRequests","config", function ($http,$scope,$routeParams,$uibModal,cardsServicesRequests,paymentsServicesRequests,config) {
        $scope.payments = {}
        $scope.card = {}
        $scope.deleteResponse = {}
        $scope.paymentSelected = {}

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


        $scope.openModal = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'viewPagamentos/deleteTemplatePayment.html',
                controller: "deleteTemplatePaymentCtrl",
                resolve: {
                    keyPromise: function() {
                        return $scope.paymentSelected;
                    }
                }
            }); 
            modalInstance.result.then(function (message) {
                $scope.getCard($routeParams.idCard);
                $scope.getPayments($routeParams.idCard);
                $scope.paymentSelected.disable = false;
          },function() {
              $scope.paymentSelected.disable = false;
              console.log("fechou");
          });
        }


        $scope.setDeleteId = function(paymentToDelete){
            $scope.paymentSelected = paymentToDelete;
            $scope.paymentSelected.disable = true;
            $scope.openModal();
        }
    }]);
