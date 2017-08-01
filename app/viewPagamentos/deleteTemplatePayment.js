'use strict';

var app = angular.module('myApp.deleteTemplatePayment', ['ngRoute']);

app.controller('deleteTemplatePaymentCtrl', ["$http","$scope","$location","$uibModal","$log","paymentsServicesRequests", "config", "keyPromise", "$uibModalInstance", function ($http,$scope,$location,$uibModal,$log,paymentsServicesRequests,config,keyPromise, $uibModalInstance) {
        $scope.cardDeleted = {}    
    
        $scope.keyPromise = keyPromise;

        $scope.deletePayment = function(payment){
            paymentsServicesRequests.deletePayment(payment.id).then(function(response){
                $scope.deleteResponse = response.data;
                $uibModalInstance.close(response.data);
            },function(error){
                $scope.deleteResponse = error.data || 'Request failed';
                $uibModalInstance.dismiss();
            });
        }

        $scope.close = function() {
            $uibModalInstance.dismiss();
        }
}]);