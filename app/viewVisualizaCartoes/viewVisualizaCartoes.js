'use strict';

var app = angular.module('myApp.view1', ['ngRoute']);

app.controller('ViewVisualizaCartoesCtrl', ["$http","$scope","$location","$uibModal","$log","cardsServicesRequests", "config", function ($http,$scope,$location,$uibModal,$log,cardsServicesRequests,config) {
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

        $scope.openModal = function () {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'viewVisualizaCartoes/deleteTemplate.html',
            //    scope: $scope
            });        
        }

        $scope.setDeleteId = function(idToDelete){
            $scope.selectedCardId = idToDelete;
            $scope.openModal();
        }


}]);