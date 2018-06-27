const app = angular.module('goodman_app', []);

app.controller('NavController', ['$http', '$scope', '$location',function($http, $scope, $location) {
  //this.test = 'Yo Yo, its working';

  this.goTime = (url) => {
    let name = url.slice(8,url.indexOf('.'))
    console.log(`Waking up ${name}`);
    $http({
        method: 'get',
        url: url,
    }).then(response => {
      console.log('success', response);
    }, error => {
      console.log(`${name} up.`);
    }).catch(err => console.error('Catch'))
  };

  this.urls = [
    'https://tooliebox-api.herokuapp.com',
    'https://timesheets-io.herokuapp.com/',
    'https://dotti-agency.herokuapp.com/',
    'https://xcursion.herokuapp.com/'
  ]

  if ($location.absUrl().slice(7, 16) != 'localhost') {
    for (let url of this.urls) {
      this.goTime(url);
    }
  };

}]);
