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

const blogValidate = () => {
	$('#blog-form').submit();
}

$(function () {
	'use strict';

	var width = $(window).width();
	var height = $(window).height();
	$('.section.started').css({'height':height});

	let devMode = false;
	let pathname = window.location.host;
	pathname = pathname.slice(0,9)
	if (pathname === 'localhost') {
		console.log('devMode: ', pathname);
		devMode = true;
	} else {
		console.log('production: ', pathname);
	}

	/* Preloader */
	$(window).on('load', function() {
		$(".preloader .spinner").fadeOut(function(){
			$('.preloader').fadeOut();
			$('body').addClass('ready');
		});
	});

	/* Typed subtitle */
	$('.typed-title').typed({
		stringsElement: $('.typing-title'),
		backDelay: 3000, /* Delay in text change */
		typeSpeed: 20, /* Typing speed */
		loop: true
	});

	// /* Youtube video background */
	// var myPlayer = $("#video-bg").YTPlayer();

	/* Smoothscroll */
	if($('.section.started').length) {
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop() + 150;
			//console.log(scrollPos);
			$('.top-menu ul li a')
			.each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				var offset = refElement.offset().top
				if ( offset <= scrollPos) {
					$('.top-menu ul li.active').removeClass("active");
					//console.log(currLink.parent());
					currLink.parent().addClass("active");
				}
			});
		});
	}

	/* Top Menu */
	if($('.section.started').length) {
		let menu = $('.top-menu ul li a')
		menu.on('click', function(){
			openSideNav();
			var id = $(this).attr('href');
			var h = parseFloat($(id).offset().top);

			$('body,html').animate({
				scrollTop: h - 65
			}, 800);
			return false;
		});
	}

	const openSideNav = () => {
		if($('.top-menu').hasClass('active')){
			$('.top-menu').removeClass('active');
			$(this).removeClass('active');
		} else {
			$('.top-menu').addClass('active');
			$(this).addClass('active');
		}

		return false;
	}

	/* Open Top Menu */
	$('.page').on('click', '.menu-btn', openSideNav);
	$('.close').on('click', openSideNav);
	/* Hide mouse button on scroll */
	$(window).on('scroll', function() {
		if ($(this).scrollTop() >= height-10) {
			$('.mouse-btn').fadeOut();
		}
		if ($(this).scrollTop() <= height-10) {
			$('.mouse-btn').fadeIn();
		}
		if ($(this).scrollTop() <= height-10) {
			$('.top-menu ul li').removeClass("active");
		}
	});

	// /* Pause/Play video on scroll */
	// if ($('#video-bg').length) {
	// 	$(window).on('scroll', function() {
	// 		if ($(this).scrollTop() >= height-10) {
	// 			$('#video-bg').YTPPause();
	// 		}
	// 		if ($(this).scrollTop() <= height-10) {
	// 			$('#video-bg').YTPPlay();
	// 		}
	// 	});
	// }

	/* On click mouse button, page scroll down */
	$('.section').on('click', '.mouse-btn', function() {
		$('body,html').animate({
			scrollTop: height
		}, 800);
	});

	/* Menu filled */
	if($(window).scrollTop() > 100) {
		$('header').addClass('filled');
	} else {
		$('header').removeClass('filled');
	}
	$(window).on('scroll', function() {
		if($(window).scrollTop() > 100) {
			$('header').addClass('filled');
		} else {
			$('header').removeClass('filled');
		}
	});

	/* Initialize masonry items */
	var $container = $('.box-items');

	$container.imagesLoaded(function() {
		$container.multipleFilterMasonry({
			itemSelector: '.box-item',
			filtersGroupSelector: '.filters',
			percentPosition: true,
			gutter: 0
		});
	});


	/* 12. Initialize masonry filter */
	$('.filters label').on('change', 'input[type="radio"]', function() {
		// console.log('running');
		if ($(this).is(':checked')) {
			$('.f_btn').removeClass('active');
			$(this).closest('.f_btn').addClass('active');
		}
		/* Refresh Portfolio magnific popup */
		$('.has-popup').magnificPopup({
			type: 'inline',
			overflowY: 'auto',
			closeBtnInside: true,
			mainClass: 'mfp-fade',
			callbacks: {
		    open: function() {
		      console.log('wake up server f(x)');
					if (!devMode) wakeUp(serverURLs[this.currItem.src]);
		    }
			}
		});
	});

	/* Portfolio magnific popup */
	$('.has-popup').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade',
		callbacks: {
	    open: function() {
	      // console.log('wake up server f(x)');
				// if (!devMode) wakeUp(serverURLs[this.currItem.src]);
	    }
		}
	});

	/* gallery */
	$('.post-lightbox').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});

	/* Validate contact form */
	$("#cform").validate({
		rules: {
			name: {
				required: true
			},
			tel: {
				required: true
			},
			message: {
				required: true
			},
			subject: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
			console.log('yep!!');
			$.ajax({
				url: 'contact',
				type: 'post',
				dataType: 'json',
				data: 'name='+ $("#cform").find('input[name="name"]').val() + '&tel='+ $("#cform").find('input[name="tel"]').val() + '&email='+ $("#cform").find('input[name="email"]').val() + '&subject='+ $("#cform").find('input[name="subject"]').val() + '&message=' + $("#cform").find('textarea[name="message"]').val(),
				beforeSend: function() {

				},
				complete: function() {

				},
				success: function(data) {
					$('#cform').fadeOut();
					$('.alert-success').delay(1000).fadeIn();
				},
				error: function (data) {
					console.log('error f(x)');
					console.log(data);
				}
			});
		}
	});

	/* Validate contact form */
	$("#blog-form").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
			console.log('yep yep!!');
			return false;
			// $('#blog-form').fadeOut();
			// $('.alert-success').delay(1000).fadeIn();
		}
	});

	const serverURLs = {
		"#bopz": 'https://business-opz.herokuapp.com/',
		"#dotti": 'https://dotti-agency.herokuapp.com/',
		"#xc": 'https://xcursion.herokuapp.com/',
		"#toolie": 'https://tooliebox.herokuapp.com/',
		"#sailors": 'https://tg970.github.io/tg.com/',
		"#time": 'https://timesheets-io.herokuapp.com/'
	}

	//wake up project servers
	const wakeUp = (url) => {
		console.log('wake up running', url);
		$.ajax({
			url: url,
			method: 'GET',
			success: function(response) {
				console.log('jq ajax call success');
				console.log(result);
			},
			error: function(xhr) {
	      console.log('ajax error');
				//console.log(xhr);
	    }
		})
	}
	//wakeUp('https://dryhollow.herokuapp.com/');

});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImJsb2cuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZ29vZG1hbl9hcHAnLCBbXSk7XG5cbmFwcC5jb250cm9sbGVyKCdOYXZDb250cm9sbGVyJywgWyckaHR0cCcsICckc2NvcGUnLCAnJGxvY2F0aW9uJyxmdW5jdGlvbigkaHR0cCwgJHNjb3BlLCAkbG9jYXRpb24pIHtcbiAgLy90aGlzLnRlc3QgPSAnWW8gWW8sIGl0cyB3b3JraW5nJztcblxuICB0aGlzLmdvVGltZSA9ICh1cmwpID0+IHtcbiAgICBsZXQgbmFtZSA9IHVybC5zbGljZSg4LHVybC5pbmRleE9mKCcuJykpXG4gICAgY29uc29sZS5sb2coYFdha2luZyB1cCAke25hbWV9YCk7XG4gICAgJGh0dHAoe1xuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICB1cmw6IHVybCxcbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJywgcmVzcG9uc2UpO1xuICAgIH0sIGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGAke25hbWV9IHVwLmApO1xuICAgIH0pLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKCdDYXRjaCcpKVxuICB9O1xuXG4gIHRoaXMudXJscyA9IFtcbiAgICAnaHR0cHM6Ly90b29saWVib3gtYXBpLmhlcm9rdWFwcC5jb20nLFxuICAgICdodHRwczovL3RpbWVzaGVldHMtaW8uaGVyb2t1YXBwLmNvbS8nLFxuICAgICdodHRwczovL2RvdHRpLWFnZW5jeS5oZXJva3VhcHAuY29tLycsXG4gICAgJ2h0dHBzOi8veGN1cnNpb24uaGVyb2t1YXBwLmNvbS8nXG4gIF1cblxuICBpZiAoJGxvY2F0aW9uLmFic1VybCgpLnNsaWNlKDcsIDE2KSAhPSAnbG9jYWxob3N0Jykge1xuICAgIGZvciAobGV0IHVybCBvZiB0aGlzLnVybHMpIHtcbiAgICAgIHRoaXMuZ29UaW1lKHVybCk7XG4gICAgfVxuICB9O1xuXG59XSk7XG4iLCJhcHAuY29udHJvbGxlcignQmxvZ0NvbnRyb2xsZXInLCBbJyRodHRwJywgJyRzY29wZScsICckbG9jYXRpb24nLGZ1bmN0aW9uKCRodHRwLCAkc2NvcGUsICRsb2NhdGlvbikge1xuICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICB0aGlzLmNvbW1lbnRzID0gW107XG5cbiAgdGhpcy5nZXRDb21tZW50cyA9IChpdGVtKSA9PiB7XG4gICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgY29uc29sZS5sb2coJ2l0ZW0nLCBpdGVtICk7XG4gICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICB1cmw6IGAvYmxvZy8ke2l0ZW19YFxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhLmNvbW1lbnRzKTtcbiAgICAgICAgICB0aGlzLmNvbW1lbnRzID0gcmVzcG9uc2UuZGF0YS5jb21tZW50cztcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0NhdGNoJywgZXJyKSk7XG4gICAgfVxuICAgIC8vcmV0dXJuICdzb21ldGhpbmcnXG4gIH1cblxuICB0aGlzLnN1Ym1pdCA9IChuZXdJbmZvLCBpdGVtKSA9PiB7XG4gICAgY29uc29sZS5sb2cobmV3SW5mbyk7XG4gICAgYmxvZ1ZhbGlkYXRlKCk7XG4gICAgaWYgKFxuICAgICAgbmV3SW5mby5uYW1lICYmXG4gICAgICBuZXdJbmZvLmVtYWlsICYmXG4gICAgICBuZXdJbmZvLmNvbW1lbnRcbiAgICApIHtcbiAgICAgIG5ld0luZm8uYmxvZyA9IGl0ZW07XG4gICAgICAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgdXJsOiBgL2Jsb2dgLFxuICAgICAgICAgIGRhdGE6IG5ld0luZm9cbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0NhdGNoJywgZXJyKSk7XG4gICAgfVxuICB9XG5cbn1dKTtcbiIsImNvbnN0IGJsb2dWYWxpZGF0ZSA9ICgpID0+IHtcclxuXHQkKCcjYmxvZy1mb3JtJykuc3VibWl0KCk7XHJcbn1cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0dmFyIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcblx0dmFyIGhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHQkKCcuc2VjdGlvbi5zdGFydGVkJykuY3NzKHsnaGVpZ2h0JzpoZWlnaHR9KTtcclxuXHJcblx0bGV0IGRldk1vZGUgPSBmYWxzZTtcclxuXHRsZXQgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdDtcclxuXHRwYXRobmFtZSA9IHBhdGhuYW1lLnNsaWNlKDAsOSlcclxuXHRpZiAocGF0aG5hbWUgPT09ICdsb2NhbGhvc3QnKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZGV2TW9kZTogJywgcGF0aG5hbWUpO1xyXG5cdFx0ZGV2TW9kZSA9IHRydWU7XHJcblx0fSBlbHNlIHtcclxuXHRcdGNvbnNvbGUubG9nKCdwcm9kdWN0aW9uOiAnLCBwYXRobmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKiBQcmVsb2FkZXIgKi9cclxuXHQkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdCQoXCIucHJlbG9hZGVyIC5zcGlubmVyXCIpLmZhZGVPdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdyZWFkeScpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qIFR5cGVkIHN1YnRpdGxlICovXHJcblx0JCgnLnR5cGVkLXRpdGxlJykudHlwZWQoe1xyXG5cdFx0c3RyaW5nc0VsZW1lbnQ6ICQoJy50eXBpbmctdGl0bGUnKSxcclxuXHRcdGJhY2tEZWxheTogMzAwMCwgLyogRGVsYXkgaW4gdGV4dCBjaGFuZ2UgKi9cclxuXHRcdHR5cGVTcGVlZDogMjAsIC8qIFR5cGluZyBzcGVlZCAqL1xyXG5cdFx0bG9vcDogdHJ1ZVxyXG5cdH0pO1xyXG5cclxuXHQvLyAvKiBZb3V0dWJlIHZpZGVvIGJhY2tncm91bmQgKi9cclxuXHQvLyB2YXIgbXlQbGF5ZXIgPSAkKFwiI3ZpZGVvLWJnXCIpLllUUGxheWVyKCk7XHJcblxyXG5cdC8qIFNtb290aHNjcm9sbCAqL1xyXG5cdGlmKCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5sZW5ndGgpIHtcclxuXHRcdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHNjcm9sbFBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArIDE1MDtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhzY3JvbGxQb3MpO1xyXG5cdFx0XHQkKCcudG9wLW1lbnUgdWwgbGkgYScpXHJcblx0XHRcdC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR2YXIgY3VyckxpbmsgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdHZhciByZWZFbGVtZW50ID0gJChjdXJyTGluay5hdHRyKFwiaHJlZlwiKSk7XHJcblx0XHRcdFx0dmFyIG9mZnNldCA9IHJlZkVsZW1lbnQub2Zmc2V0KCkudG9wXHJcblx0XHRcdFx0aWYgKCBvZmZzZXQgPD0gc2Nyb2xsUG9zKSB7XHJcblx0XHRcdFx0XHQkKCcudG9wLW1lbnUgdWwgbGkuYWN0aXZlJykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGN1cnJMaW5rLnBhcmVudCgpKTtcclxuXHRcdFx0XHRcdGN1cnJMaW5rLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qIFRvcCBNZW51ICovXHJcblx0aWYoJCgnLnNlY3Rpb24uc3RhcnRlZCcpLmxlbmd0aCkge1xyXG5cdFx0bGV0IG1lbnUgPSAkKCcudG9wLW1lbnUgdWwgbGkgYScpXHJcblx0XHRtZW51Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdG9wZW5TaWRlTmF2KCk7XHJcblx0XHRcdHZhciBpZCA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cdFx0XHR2YXIgaCA9IHBhcnNlRmxvYXQoJChpZCkub2Zmc2V0KCkudG9wKTtcclxuXHJcblx0XHRcdCQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdHNjcm9sbFRvcDogaCAtIDY1XHJcblx0XHRcdH0sIDgwMCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Y29uc3Qgb3BlblNpZGVOYXYgPSAoKSA9PiB7XHJcblx0XHRpZigkKCcudG9wLW1lbnUnKS5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG5cdFx0XHQkKCcudG9wLW1lbnUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnLnRvcC1tZW51JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKiBPcGVuIFRvcCBNZW51ICovXHJcblx0JCgnLnBhZ2UnKS5vbignY2xpY2snLCAnLm1lbnUtYnRuJywgb3BlblNpZGVOYXYpO1xyXG5cdCQoJy5jbG9zZScpLm9uKCdjbGljaycsIG9wZW5TaWRlTmF2KTtcclxuXHQvKiBIaWRlIG1vdXNlIGJ1dHRvbiBvbiBzY3JvbGwgKi9cclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gaGVpZ2h0LTEwKSB7XHJcblx0XHRcdCQoJy5tb3VzZS1idG4nKS5mYWRlT3V0KCk7XHJcblx0XHR9XHJcblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8PSBoZWlnaHQtMTApIHtcclxuXHRcdFx0JCgnLm1vdXNlLWJ0bicpLmZhZGVJbigpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPD0gaGVpZ2h0LTEwKSB7XHJcblx0XHRcdCQoJy50b3AtbWVudSB1bCBsaScpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyAvKiBQYXVzZS9QbGF5IHZpZGVvIG9uIHNjcm9sbCAqL1xyXG5cdC8vIGlmICgkKCcjdmlkZW8tYmcnKS5sZW5ndGgpIHtcclxuXHQvLyBcdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcblx0Ly8gXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IGhlaWdodC0xMCkge1xyXG5cdC8vIFx0XHRcdCQoJyN2aWRlby1iZycpLllUUFBhdXNlKCk7XHJcblx0Ly8gXHRcdH1cclxuXHQvLyBcdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPD0gaGVpZ2h0LTEwKSB7XHJcblx0Ly8gXHRcdFx0JCgnI3ZpZGVvLWJnJykuWVRQUGxheSgpO1xyXG5cdC8vIFx0XHR9XHJcblx0Ly8gXHR9KTtcclxuXHQvLyB9XHJcblxyXG5cdC8qIE9uIGNsaWNrIG1vdXNlIGJ1dHRvbiwgcGFnZSBzY3JvbGwgZG93biAqL1xyXG5cdCQoJy5zZWN0aW9uJykub24oJ2NsaWNrJywgJy5tb3VzZS1idG4nLCBmdW5jdGlvbigpIHtcclxuXHRcdCQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG5cdFx0XHRzY3JvbGxUb3A6IGhlaWdodFxyXG5cdFx0fSwgODAwKTtcclxuXHR9KTtcclxuXHJcblx0LyogTWVudSBmaWxsZWQgKi9cclxuXHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAxMDApIHtcclxuXHRcdCQoJ2hlYWRlcicpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdH1cclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMTAwKSB7XHJcblx0XHRcdCQoJ2hlYWRlcicpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogSW5pdGlhbGl6ZSBtYXNvbnJ5IGl0ZW1zICovXHJcblx0dmFyICRjb250YWluZXIgPSAkKCcuYm94LWl0ZW1zJyk7XHJcblxyXG5cdCRjb250YWluZXIuaW1hZ2VzTG9hZGVkKGZ1bmN0aW9uKCkge1xyXG5cdFx0JGNvbnRhaW5lci5tdWx0aXBsZUZpbHRlck1hc29ucnkoe1xyXG5cdFx0XHRpdGVtU2VsZWN0b3I6ICcuYm94LWl0ZW0nLFxyXG5cdFx0XHRmaWx0ZXJzR3JvdXBTZWxlY3RvcjogJy5maWx0ZXJzJyxcclxuXHRcdFx0cGVyY2VudFBvc2l0aW9uOiB0cnVlLFxyXG5cdFx0XHRndXR0ZXI6IDBcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyogMTIuIEluaXRpYWxpemUgbWFzb25yeSBmaWx0ZXIgKi9cclxuXHQkKCcuZmlsdGVycyBsYWJlbCcpLm9uKCdjaGFuZ2UnLCAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJywgZnVuY3Rpb24oKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZygncnVubmluZycpO1xyXG5cdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0JCgnLmZfYnRuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5mX2J0bicpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHRcdC8qIFJlZnJlc2ggUG9ydGZvbGlvIG1hZ25pZmljIHBvcHVwICovXHJcblx0XHQkKCcuaGFzLXBvcHVwJykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHRcdHR5cGU6ICdpbmxpbmUnLFxyXG5cdFx0XHRvdmVyZmxvd1k6ICdhdXRvJyxcclxuXHRcdFx0Y2xvc2VCdG5JbnNpZGU6IHRydWUsXHJcblx0XHRcdG1haW5DbGFzczogJ21mcC1mYWRlJyxcclxuXHRcdFx0Y2FsbGJhY2tzOiB7XHJcblx0XHQgICAgb3BlbjogZnVuY3Rpb24oKSB7XHJcblx0XHQgICAgICBjb25zb2xlLmxvZygnd2FrZSB1cCBzZXJ2ZXIgZih4KScpO1xyXG5cdFx0XHRcdFx0aWYgKCFkZXZNb2RlKSB3YWtlVXAoc2VydmVyVVJMc1t0aGlzLmN1cnJJdGVtLnNyY10pO1xyXG5cdFx0ICAgIH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qIFBvcnRmb2xpbyBtYWduaWZpYyBwb3B1cCAqL1xyXG5cdCQoJy5oYXMtcG9wdXAnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdHR5cGU6ICdpbmxpbmUnLFxyXG5cdFx0b3ZlcmZsb3dZOiAnYXV0bycsXHJcblx0XHRjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuXHRcdG1haW5DbGFzczogJ21mcC1mYWRlJyxcclxuXHRcdGNhbGxiYWNrczoge1xyXG5cdCAgICBvcGVuOiBmdW5jdGlvbigpIHtcclxuXHQgICAgICAvLyBjb25zb2xlLmxvZygnd2FrZSB1cCBzZXJ2ZXIgZih4KScpO1xyXG5cdFx0XHRcdC8vIGlmICghZGV2TW9kZSkgd2FrZVVwKHNlcnZlclVSTHNbdGhpcy5jdXJySXRlbS5zcmNdKTtcclxuXHQgICAgfVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBnYWxsZXJ5ICovXHJcblx0JCgnLnBvc3QtbGlnaHRib3gnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdGRlbGVnYXRlOiAnYScsXHJcblx0XHR0eXBlOiAnaW1hZ2UnLFxyXG5cdFx0dExvYWRpbmc6ICdMb2FkaW5nIGltYWdlICMlY3VyciUuLi4nLFxyXG5cdFx0bWFpbkNsYXNzOiAnbWZwLWltZy1tb2JpbGUnLFxyXG5cdFx0Z2FsbGVyeToge1xyXG5cdFx0XHRlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRuYXZpZ2F0ZUJ5SW1nQ2xpY2s6IHRydWUsXHJcblx0XHRcdHByZWxvYWQ6IFswLDFdIC8vIFdpbGwgcHJlbG9hZCAwIC0gYmVmb3JlIGN1cnJlbnQsIGFuZCAxIGFmdGVyIHRoZSBjdXJyZW50IGltYWdlXHJcblx0XHR9LFxyXG5cdFx0aW1hZ2U6IHtcclxuXHRcdFx0dEVycm9yOiAnPGEgaHJlZj1cIiV1cmwlXCI+VGhlIGltYWdlICMlY3VyciU8L2E+IGNvdWxkIG5vdCBiZSBsb2FkZWQuJ1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBWYWxpZGF0ZSBjb250YWN0IGZvcm0gKi9cclxuXHQkKFwiI2Nmb3JtXCIpLnZhbGlkYXRlKHtcclxuXHRcdHJ1bGVzOiB7XHJcblx0XHRcdG5hbWU6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0ZWw6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtZXNzYWdlOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0c3ViamVjdDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdGVtYWlsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXHJcblx0XHRcdFx0ZW1haWw6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IFwidmFsaWRcIixcclxuXHRcdHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygneWVwISEnKTtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR1cmw6ICdjb250YWN0JyxcclxuXHRcdFx0XHR0eXBlOiAncG9zdCcsXHJcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcclxuXHRcdFx0XHRkYXRhOiAnbmFtZT0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJuYW1lXCJdJykudmFsKCkgKyAnJnRlbD0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJ0ZWxcIl0nKS52YWwoKSArICcmZW1haWw9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwiZW1haWxcIl0nKS52YWwoKSArICcmc3ViamVjdD0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJzdWJqZWN0XCJdJykudmFsKCkgKyAnJm1lc3NhZ2U9JyArICQoXCIjY2Zvcm1cIikuZmluZCgndGV4dGFyZWFbbmFtZT1cIm1lc3NhZ2VcIl0nKS52YWwoKSxcclxuXHRcdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0JCgnI2Nmb3JtJykuZmFkZU91dCgpO1xyXG5cdFx0XHRcdFx0JCgnLmFsZXJ0LXN1Y2Nlc3MnKS5kZWxheSgxMDAwKS5mYWRlSW4oKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2Vycm9yIGYoeCknKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIFZhbGlkYXRlIGNvbnRhY3QgZm9ybSAqL1xyXG5cdCQoXCIjYmxvZy1mb3JtXCIpLnZhbGlkYXRlKHtcclxuXHRcdHJ1bGVzOiB7XHJcblx0XHRcdG5hbWU6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtZXNzYWdlOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0ZW1haWw6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcclxuXHRcdFx0XHRlbWFpbDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogXCJ2YWxpZFwiLFxyXG5cdFx0c3VibWl0SGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCd5ZXAgeWVwISEnKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyAkKCcjYmxvZy1mb3JtJykuZmFkZU91dCgpO1xyXG5cdFx0XHQvLyAkKCcuYWxlcnQtc3VjY2VzcycpLmRlbGF5KDEwMDApLmZhZGVJbigpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCBzZXJ2ZXJVUkxzID0ge1xyXG5cdFx0XCIjYm9welwiOiAnaHR0cHM6Ly9idXNpbmVzcy1vcHouaGVyb2t1YXBwLmNvbS8nLFxyXG5cdFx0XCIjZG90dGlcIjogJ2h0dHBzOi8vZG90dGktYWdlbmN5Lmhlcm9rdWFwcC5jb20vJyxcclxuXHRcdFwiI3hjXCI6ICdodHRwczovL3hjdXJzaW9uLmhlcm9rdWFwcC5jb20vJyxcclxuXHRcdFwiI3Rvb2xpZVwiOiAnaHR0cHM6Ly90b29saWVib3guaGVyb2t1YXBwLmNvbS8nLFxyXG5cdFx0XCIjc2FpbG9yc1wiOiAnaHR0cHM6Ly90Zzk3MC5naXRodWIuaW8vdGcuY29tLycsXHJcblx0XHRcIiN0aW1lXCI6ICdodHRwczovL3RpbWVzaGVldHMtaW8uaGVyb2t1YXBwLmNvbS8nXHJcblx0fVxyXG5cclxuXHQvL3dha2UgdXAgcHJvamVjdCBzZXJ2ZXJzXHJcblx0Y29uc3Qgd2FrZVVwID0gKHVybCkgPT4ge1xyXG5cdFx0Y29uc29sZS5sb2coJ3dha2UgdXAgcnVubmluZycsIHVybCk7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnanEgYWpheCBjYWxsIHN1Y2Nlc3MnKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24oeGhyKSB7XHJcblx0ICAgICAgY29uc29sZS5sb2coJ2FqYXggZXJyb3InKTtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHhocik7XHJcblx0ICAgIH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdC8vd2FrZVVwKCdodHRwczovL2RyeWhvbGxvdy5oZXJva3VhcHAuY29tLycpO1xyXG5cclxufSk7XHJcbiJdfQ==
