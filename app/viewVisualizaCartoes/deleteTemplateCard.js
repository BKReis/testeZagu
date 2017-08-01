'use strict';

var app = angular.module('myApp.deleteTemplateCard', ['ngRoute']);

app.controller('deleteTemplateCardCtrl', ["$http","$scope","$location","$uibModal","$log","cardsServicesRequests", "config", "keyPromise", "$uibModalInstance", function ($http,$scope,$location,$uibModal,$log,cardsServicesRequests,config,keyPromise, $uibModalInstance) {
       
        $scope.keyPromise = keyPromise;

        $scope.deleteCard = function(idFromCardToDelete) {
            cardsServicesRequests.deleteCard(idFromCardToDelete).then(function(response){
                $scope.cardDeleted = response.data;
                $uibModalInstance.close(response.data);
            },function(error){ 
                $scope.cardDeleted = error.data || 'Request failed';
                $uibModalInstance.dismiss();
            });
        } 


        $scope.close = function() {
            $uibModalInstance.dismiss();
        }
}]);