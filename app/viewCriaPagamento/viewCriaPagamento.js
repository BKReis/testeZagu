'use strict';

angular.module('myApp.viewCriaPagamento', ['ngRoute'])

    .controller('ViewCriaPagamentoCtrl', ["$http", "$scope", "$location","$routeParams","paymentsServicesRequests", "config", function ($http,$scope,$location,$routeParams,paymentsServicesRequests,config) {
        $scope.newPayment= {}
        $scope.thereIsErrors = false;
        $scope.errors = [];
        $scope.newPayment.card_id = $routeParams.idCard;

        $scope.createPayment = function(newPayment){
            //Disable
            $scope.newPayment.disable = true;
            //Display de Erros
            $scope.thereIsErrors = false;
            $scope.errors = []
            //Validação dos campos
            if( !$scope.newPayment.amount){
                $scope.errors.push({name: "amount", text: "Deve ser digitado um valor para o pagamento!"})
                $scope.thereIsErrors = true;
                $scope.newPayment.disable = false; 
            }
            if($scope.thereIsErrors == true){
                return;
            }
            //Conversão valor
            var copyPayment = angular.copy(newPayment)
            copyPayment.amount = parseInt(copyPayment.amount*100);
            //Requisição
            paymentsServicesRequests.createPayment(copyPayment).then(function(response){
                $scope.newPayment = response.data;
                $scope.newPayment.disable = false;
                $scope.errors = []
                $location.path('/VisualizarPagamentos/' + $scope.newPayment.card_id)
            },function(error){
                $scope.newPayment.errors = error.data.errors;
                $scope.errors = []
                $scope.newPayment.disable = false;
            });
        }
    }]);

