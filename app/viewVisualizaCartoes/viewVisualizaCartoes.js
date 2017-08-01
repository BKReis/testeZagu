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

        $scope.openModal = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'viewVisualizaCartoes/deleteTemplateCard.html',
                controller: "deleteTemplateCardCtrl",
                resolve: {
                    keyPromise: function() {
                        return $scope.selectedCardId;
                    }
                }
            }); 
            modalInstance.result.then(function (message) {
                $scope.getCards();
          }, function() {
              console.log("fechou");
          });
        }

        // var modalInstance = $uibModal.open({
        //       templateUrl: 'app/_common/messages/_edit.tpl.html',
        //       controller: 'EditMessageModalCtrl',
        //       backdrop: 'static',
        //       //size: 'lg',
        //       resolve: {
        //           customerPromise: $scope.prospect,
        //           parentModel: { name: 'Prospect' },
        //           messagePromise: message
        //       }
        //   });

        $scope.setDeleteId = function(idToDelete){
            $scope.selectedCardId = idToDelete;
            $scope.openModal();
        }


}]);