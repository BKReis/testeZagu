'use strict';

var app = angular.module('myApp.filters', ['ngRoute']);

app.filter('formatCardNumber',function(){
    return function(x){
        if (x){
            var i,c,txt = '';
            for(i=0;i<16;i++){
                c = x[i];
                if((i!==0) && (i%4 ==0)){
                    txt+= ' ';
                    txt+= c;
                }else{
                    txt+= c;
                }
            }
        }
        return txt;
    }
});
