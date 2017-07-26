'use strict';
var app = angular.module('myApp.cardsServicesRequests',[]);

app.service('cardsServicesRequests', ["$http","$window","config",function($http,$window,config) {    
    var card = {};

    card.getCards = function (){
        return $http({
            method: "GET",
            headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
    },
            url: config.URL + "cards",
        });
    };

    card.deleteCard = function(cardID){
        return $http({
                method: "DELETE",
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
    },
                url: config.URL + "cards/" + cardID
            });
    };

    card.createCard = function(newCard) {
        return $http({
                method: "POST",
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
    },
                url: config.URL + "cards",
                data: newCard
            });
    };

    card.getCard = function(cardId){
        console.log(cardId);
        return $http({
                method: "GET",
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
    },
                url: config.URL + "cards/" + cardId
            });
    };
      
    card.updateCard = function(card){
        return $http({
                method: "PATCH",
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
    },
                url: config.URL + "cards/" + card.id,
                data: card
            });
    };

    return card;
}]);