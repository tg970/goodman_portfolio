const app = angular.module('goodman_app', []);

app.controller('NavController', ['$http', '$scope', '$location',function($http, $scope, $location) {
  this.test = 'Yo Yo, its working';
}]);
