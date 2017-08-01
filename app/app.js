'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.viewHome',
    'myApp.viewAlteraCartao',
    'myApp.viewPagamentos',
    'myApp.viewCriaPagamento',
    'myApp.viewAlteraStatusPagamento',
    'myApp.cardsServicesRequests',
    'myApp.paymentsServicesRequests',
    'myApp.filters',
    'myApp.deleteTemplateCard',
    'myApp.deleteTemplatePayment',
    'ui.utils.masks',
    'ui.mask',
    'ui.bootstrap'
])

    /*
    .controller("HeaderController", function($scope,$location){
        $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    })
    */
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/Home',{
                templateUrl: 'viewHome/viewHome.html',
                controller: 'ViewHomeCtrl',
                controllerAs: 'vm'
            })
            .when('/VisualizarCartoes', {
                templateUrl: 'viewVisualizaCartoes/viewVisualizaCartoes.html',
                controller: 'ViewVisualizaCartoesCtrl',
                controllerAs: 'vm'
            })
            .when('/CadastroCartao', {
                templateUrl: 'viewCadastroCartao/viewCadastroCartao.html',
                controller: 'ViewCadastraCartaoCtrl',
                controllerAs: 'vm'
            })
            .when('/AlteraCartao/:idCard', {
                templateUrl: 'viewAlteraCartao/viewAlteraCartao.html',
                controller: 'ViewAlteraCartaoCtrl',
                controllerAs: 'vm'
            })
            .when('/VisualizarPagamentos/:idCard/CriarPagamento',{
                templateUrl: 'viewCriaPagamento/viewCriaPagamento.html',
                controller: 'ViewCriaPagamentoCtrl',
                controllerAs: 'vm'
            })
            .when('/VisualizarPagamentos/:idCard/AlterarStatusPagamento/:idPayment',{
                templateUrl: 'viewAlteraStatusPagamento/viewAlteraStatusPagamento.html',
                controller: 'ViewAlteraStatusPagamentoCtrl',
                controllerAs: 'vm'
            })
            .when('/VisualizarPagamentos/:idCard', {
                templateUrl: 'viewPagamentos/viewPagamentos.html',
                controller: 'ViewPagamentosCtrl',
                controllerAs: 'vm'
            });

        $routeProvider.otherwise({redirectTo: '/Home'});

    }])

    .constant('config', {
        "URL": "http://estagio.zagu.com.br/"
    });
