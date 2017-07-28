'use strict';
var app = angular.module('myApp.paymentsServicesRequests',[]);

app.service('paymentsServicesRequests', ["$http","config","$window",function($http,config,$window) {
    var request = {};

        request.getPayments = function (cardId) {
            return  $http({
                method: "GET",
                url: config.URL + "cards/" + cardId + "/payments",
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
         }
            });
        };

        request.deletePayment = function (paymentId){
            return $http({
                method: "DELETE",
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
        },
                url: config.URL + "payments/" + paymentId
            });
        };
        
        request.createPayment = function (payment) {
            return $http({
                method: "POST",
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
    },
                url: config.URL + "payments",
                data: payment
            });
        };
        
        request.getPayment = function (paymentId) {
            return $http({
                method: "GET",
                url: config.URL + "payments/" + paymentId,
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
    }});
        };
        
        request.updatePayment = function (payment) {
            return $http({
                method: "PATCH",
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b24ebfe15c9e504c9cc89e826b6f91bd'
    },
                url: config.URL + "payments/" + payment.id,
                data: payment
            });
        };
        
    return request;
}]);