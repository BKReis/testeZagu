'use strict';

angular.module('myApp.viewAlteraCartao', ['ngRoute'])

    .controller('ViewAlteraCartaoCtrl', ["$http", "$scope","$routeParams","$location","cardsServicesRequests", "config", function ($http,$scope,$routeParams,$location,cardsServicesRequests, config) {
        $scope.infoCartao = {}
        $scope.infoPatch = {}

        $scope.getCard= function(idFromCardToGet) {
            cardsServicesRequests.getCard(idFromCardToGet).then(function(response){
                $scope.infoCartao = response.data;
                $scope.infoCartao.limit = $scope.infoCartao.limit/100;
            },function(error){ 
                $scope.infoCartao = error.data || 'Request failed';
            
            });
        }

        $scope.getCard($routeParams.idCard);

        $scope.updateCard = function(infoCartao){
            var newInfo = angular.copy(infoCartao)
            newInfo.limit = parseInt(newInfo.limit*100);
            cardsServicesRequests.updateCard(newInfo).then(function(response){
                $scope.infoPatch = response.data;
                $location.path('/VisualizarCartoes');
            },function(error){
                $scope.infoPatch = error.data || 'Request failed';
            });
        }

        $scope.months = _.range(1,13);
        $scope.years = _.range(2017,2030);

    }]);

