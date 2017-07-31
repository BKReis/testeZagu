'use strict';

var app = angular.module('myApp.deleteTemplate', ['ngRoute']);

app.controller('deleteTemplateCtrl', ["$http","$scope","$location","$uibModal","$log","cardsServicesRequests", "config", function ($http,$scope,$location,$uibModal,$log,cardsServicesRequests,config) {
       
        $scope.deleteCard = function(idFromCardToDelete) {
            cardsServicesRequests.deleteCard(idFromCardToDelete).then(function(response){
                $scope.cardDeleted = response.data;
                $scope.getCards();
            },function(error){ 
                $scope.cardDeleted = error.data || 'Request failed';
            });
        } 
}]);