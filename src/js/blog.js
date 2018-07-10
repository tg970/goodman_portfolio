app.controller('BlogController', ['$http', '$scope', '$location',function($http, $scope, $location) {

  this.submit = (newInfo, item) => {
    console.log(newInfo);
    blogValidate();
    if (
      newInfo.name &&
      newInfo.email &&
      newInfo.comment
    ) {
      newInfo.blog = item;
      $http({
          method: 'post',
          url: `/blog`,
          data: newInfo
        }).then(response => {
          console.log(response.data);
        }, error => {
          console.error(error.message);
      }).catch(err => console.error('Catch', err));
    }
  }

}]);
