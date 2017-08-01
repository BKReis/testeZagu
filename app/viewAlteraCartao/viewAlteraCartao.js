'use strict';

angular.module('myApp.viewAlteraCartao', ['ngRoute'])

    .controller('ViewAlteraCartaoCtrl', ["$http", "$scope","$routeParams","$location","cardsServicesRequests", "config", function ($http,$scope,$routeParams,$location,cardsServicesRequests, config) {
        $scope.infoCartao = {}
        $scope.infoPatch = {}
        $scope.errors = []
        $scope.thereIsErrors = false;

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
            //Desabilita botão
            $scope.infoCartao.disable = true;
            //Variáveis de erro
            $scope.errors = []
            $scope.thereIsErrors = false;
            //Validação dos campos
            if( !$scope.infoCartao.number || $scope.infoCartao.number.length!==16 ){
                $scope.errors.push({name: "cardId", text: "O número do cartão deve ter 16 dígitos!"})
                $scope.thereIsErrors = true;
                $scope.infoCartao.disable = false; 
            }
            if(!$scope.infoCartao.brand){
                $scope.errors.push({name: "brand", text: "Deve ser selecionada uma bandeira para o cartão!"})
                $scope.thereIsErrors = true;
                $scope.infoCartao.disable = false; 
            }
            if(!$scope.infoCartao.exp_month){
                $scope.errors.push({name: "exp_month", text: "Deve ser selecionado um mês de expiração para o cartão!"})
                $scope.thereIsErrors = true;
                $scope.infoCartao.disable = false; 
            }
            if(!$scope.infoCartao.exp_year){
                $scope.errors.push({name: "exp_year", text: "Deve ser selecionado um ano de expiração para o cartão!"})
                $scope.thereIsErrors = true;
                $scope.infoCartao.disable = false; 
            }
            if(!$scope.infoCartao.name){
                $scope.errors.push({name: "name", text: "Deve ser digitado o nome do portador do cartão!"})
                $scope.thereIsErrors = true;
                $scope.infoCartao.disable = false; 
            }
            if(!$scope.infoCartao.limit){
                $scope.errors.push({name: "limit", text: "Deve ser selecionado um limite para o cartão!"})
                $scope.thereIsErrors = true;
                $scope.infoCartao.disable = false; 
            }
            if($scope.thereIsErrors == true){
                $scope.getCard($routeParams.idCard);
                return;
            }
            //Passa pra centavos
            var newInfo = angular.copy(infoCartao)
            newInfo.limit = parseInt(newInfo.limit*100);
            //Request
            cardsServicesRequests.updateCard(newInfo).then(function(response){
                $scope.infoPatch = response.data;
                $scope.infoCartao.disable = false;
                $location.path('/VisualizarCartoes');
            },function(error){
                $scope.infoPatch = error.data || 'Request failed';
                $scope.infoCartao.disable = false;
            });
        }

        $scope.months = _.range(1,13);
        $scope.years = _.range(2017,2030);

    }]);

