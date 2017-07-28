'use strict';

var app = angular.module('myApp.view1', ['ngRoute']);

app.controller('ViewVisualizaCartoesCtrl', ["$http","$scope","$location","cardsServicesRequests", "config", function ($http,$scope,$location,cardsServicesRequests,config) {
        $scope.cards = {}
        $scope.idDelete = '';
        //Responsável por deletar cartões
        $scope.cardDeleted = {};

        $scope.getCards = function() {
            cardsServicesRequests.getCards().then(function(response){
                $scope.cards = response.data;
            },function(error){
                $scope.cards = error.data || 'Request failed';
            }); 
        };

        $scope.getCards();

        $scope.deleteCard = function(idFromCardToDelete) {
            cardsServicesRequests.deleteCard(idFromCardToDelete).then(function(response){
                $scope.cardDeleted = response.data;
                $scope.getCards();
            },function(error){ 
                $scope.cardDeleted = error.data || 'Request failed';
            });
        }

}]);