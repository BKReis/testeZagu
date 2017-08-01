'use strict';

var app = angular.module('myApp.view2', ['ngRoute','ui.mask'])

    .controller('ViewCadastraCartaoCtrl', ["$http", "$scope","$location","cardsServicesRequests", "config", function ($http,$scope,$location,cardsServicesRequests,config) {
        $scope.newCard = {}
        $scope.errors = []
        $scope.thereIsErrors = false;

        $scope.createCard = function(cardToCreate) {            
            //Desabilita botão
            $scope.newCard.disable = true;
            //Seta variáveis de erro
            $scope.thereIsErrors = false;
            $scope.errors = []
            //Validação dos campos
            if( !$scope.newCard.number || $scope.newCard.number.length!==16 ){
                $scope.errors.push({name: "cardId", text: "O número do cartão deve ter 16 dígitos!"})
                $scope.thereIsErrors = true;
                $scope.newCard.disable = false; 
            }
            if(!$scope.newCard.brand){
                $scope.errors.push({name: "brand", text: "Deve ser selecionada uma bandeira para o cartão!"})
                $scope.thereIsErrors = true;
                $scope.newCard.disable = false; 
            }
            if(!$scope.newCard.exp_month){
                $scope.errors.push({name: "exp_month", text: "Deve ser selecionado um mês de expiração para o cartão!"})
                $scope.thereIsErrors = true;
                $scope.newCard.disable = false; 
            }
            if(!$scope.newCard.exp_year){
                $scope.errors.push({name: "exp_year", text: "Deve ser selecionado um ano de expiração para o cartão!"})
                $scope.thereIsErrors = true;
                $scope.newCard.disable = false; 
            }
            if(!$scope.newCard.name){
                $scope.errors.push({name: "name", text: "Deve ser digitado o nome do portador do cartão!"})
                $scope.thereIsErrors = true;
                $scope.newCard.disable = false; 
            }
            if(!$scope.newCard.limit){
                $scope.errors.push({name: "limit", text: "Deve ser selecionado um limite para o cartão!"})
                $scope.thereIsErrors = true;
                $scope.newCard.disable = false; 
            }
            if($scope.thereIsErrors == true){
                return;
            }
            //Muda para centavos
            var newCard = angular.copy(cardToCreate)
            newCard.limit = parseInt(newCard.limit*100);
            //Requisição
            cardsServicesRequests.createCard(newCard).then(function(response){
                $scope.newCard = response.data;
                $scope.newCard.disable = false;
                $location.path('/VisualizarCartoes');
            },function(error){ 
                $scope.newCard = response.data || 'Request failed';
                $scope.newCard.disable = false;
            });
        }

        $scope.months = _.range(1,13);
        $scope.years = _.range(2017,2030);
    }]);