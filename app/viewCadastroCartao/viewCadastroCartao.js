'use strict';

var app = angular.module('myApp.view2', ['ngRoute','ui.mask'])

    .controller('ViewCadastraCartaoCtrl', ["$http", "$scope","$location","cardsServicesRequests", "config", function ($http,$scope,$location,cardsServicesRequests,config) {
        $scope.newCard = {}
    
        $scope.createCard = function(cardToCreate) {
            var newCard = angular.copy(cardToCreate)
            newCard.limit = parseInt(newCard.limit*100);
            cardsServicesRequests.createCard(newCard).then(function(response){
                $scope.newCard = response.data;
                $location.path('/VisualizarCartoes');
            },function(error){ 
                $scope.newCard = response.data || 'Request failed';
            });
        }

        $scope.months = _.range(1,13);
        $scope.years = _.range(2017,2030);
    }]);