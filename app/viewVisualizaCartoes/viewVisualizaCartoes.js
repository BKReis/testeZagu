'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .controller('ViewVisualizaCartoesCtrl', ["$http","$scope","$location","cardsServicesRequests", "config", function ($http,$scope,$location,cardsServicesRequests,config) {
        $scope.cards = {}

        //Responsável por deletar cartões
        $scope.deleteCard = {};
        $scope.idDelete = '';

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
                $scope.deleteCard = response.data;
                $scope.getCards();
            },function(error){ 
                $scope.deleteCard = response.data || 'Request failed';
                $scope.deleteCard.idDelete = '';
            });
        }

        $scope.setIdCartaoDeletado = function(idCartaoDesejado){
            $scope.deleteCard.idDelete = idCartaoDesejado;
            $scope.deleteCard($scope.deleteCard.idDelete);
        }
    }]);
