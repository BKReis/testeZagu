'use strict';

angular.module('myApp.viewCriaPagamento', ['ngRoute'])

    .controller('ViewCriaPagamentoCtrl', ["$http", "$scope", "$location","$routeParams", "config", function ($http,$scope,$location,$routeParams,config) {
        $scope.newPayment= {}

        $scope.newPayment.card_id = $routeParams.idCard;

        $scope.sendPost = function () {
            $http({
                method: "POST",
                url: config.URL + "payments",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
                },
                data: $scope.newPayment 
            }).then(function (response) {
                $scope.newPayment = response.data;
                $location.path('/VisualizarPagamentos/' + $scope.newPayment.card_id)
            }, function (response) {
                $scope.newPayment = response.data || 'Request failed';

            });
        }
    }]);

