'use strict';
var app = angular.module('myApp.cardsServicesRequests',[]);

app.service('cardsServicesRequests', ["$http","$window","config",function($http,$window,config) {    
    var card = {};
    var header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('key')
    };
    card.getCards = function (){
        return $http({
            headers: header,
            method: "GET",
            url: config.URL + "cards",
        });
    };

    card.deleteCard = function(cardID){
        return $http({
                headers: header,
                method: "DELETE",
                url: config.URL + "cards/" + cardID
            });
    };

    card.createCard = function(newCard) {
        return $http({
                headers: header,
                method: "POST",
                url: config.URL + "cards",
                data: newCard
            });
    };

    card.getCard = function(cardId){
        console.log(cardId);
        return $http({
                headers: header,
                method: "GET",
                url: config.URL + "cards/" + cardId
            });
    };
      
    card.updateCard = function(card){
        return $http({
                headers: header,
                method: "PATCH",
                url: config.URL + "cards/" + card.id,
                data: card
            });
    };

    return card;
}]);