app.controller('BlogController', ['$http', '$scope', '$location',function($http, $scope, $location) {
  this.loaded = false;
  this.comments = [];

  this.getComments = (item) => {
    if (!this.loaded) {
      console.log('item', item );
      this.loaded = true;
      $http({
          method: 'get',
          url: `/blog/${item}`
        }).then(response => {
          console.log(response.data.comments);
          this.comments = response.data.comments;
        }, error => {
          console.error(err.message);
      }).catch(err => console.error('Catch', err));
    }
    //return 'something'
  }

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
