'use strict';

/**
 * @ngdoc function
 * @name basecoderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the basecoderApp
 */

angular.module('basecoderApp')
.controller('MainCtrl', ['$scope',
   function ($scope) {

   $scope.human   = "";
   $scope.encoded = "";

   $scope.$watch('human', function(newVal, oldVal) {
     $scope.encoded = btoa(newVal);
   })

   $scope.$watch('encoded', function(newVal, oldVal) {
     $scope.human = atob(newVal);
   })

  }]
);
