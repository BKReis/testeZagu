'use strict';
var app = angular.module('myApp.paymentsServicesRequests',[]);

app.service('paymentsServicesRequests', ["$http","config","$window",function($http,config,$window) {
    var request = {};
    var header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('key')
        };

        request.getPayments = function (cardId) {
            return  $http({
                headers: header,
                method: "GET",
                url: config.URL + "cards/" + cardId + "/payments",
            });
        };

        request.deletePayment = function (paymentId){
            return $http({
                headers: header,
                method: "DELETE",
                url: config.URL + "payments/" + paymentId
            });
        };
        
        request.createPayment = function (payment) {
            return $http({
                headers: header,
                method: "POST",
                url: config.URL + "payments",
                data: payment
            });
        };
        
        request.getPayment = function (paymentId) {
            return $http({
                headers: header,
                method: "GET",
                url: config.URL + "payments/" + paymentId,
            });
        };
        
        request.updatePayment = function (payment) {
            return $http({
                headers: header,
                method: "PATCH",
                url: config.URL + "payments/" + payment.id,
                data: payment
            });
        };
        
    return request;
}]);