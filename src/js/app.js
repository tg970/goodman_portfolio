const app = angular.module('goodman_app', []); //'ngRoute'

app.controller('NavController', ['$http', '$scope', '$location', function($http, $scope, $location) {
  this.test = 'Yo Yo, its working';
}]);


// app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
//   $locationProvider.html5Mode({ enabled: true });
//
//   $routeProvider.when('/', {
//     templateUrl: 'pages/home.html',
//     // controller: 'NavController as ctrl',
//     // controllerAs: 'ctrl'
//   });
//
// }]);
