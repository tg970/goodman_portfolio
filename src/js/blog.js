app.controller('BlogController', ['$http', '$scope', '$location',function($http, $scope, $location) {
  this.loaded = false;
  this.comments = [];

  this.getComments = (item) => {
    if (!this.loaded) {
      this.loaded = true;
      $http({
          method: 'get',
          url: `/blog/${item}`
        }).then(response => {
          this.comments = response.data.comments;
        }, error => {
          console.error(err.message);
      }).catch(err => console.error('Catch', err));
    }
  };

  this.submit = (newInfo, item) => {
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
          // console.log(response.data);
          this.comments.push(response.data.new);
          blogSuccess();
          console.log(this.comments);
        }, error => {
          console.error(error.message);
      }).catch(err => console.error('Catch', err));
    }
  };

}]);
