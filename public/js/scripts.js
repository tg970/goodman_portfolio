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

const blogValidate = () => {
	$('#blog-form').submit();
};

const blogSuccess = () => {
	$('#blog-form').fadeOut();
	$('.alert-success').delay(500).fadeIn();
};

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
					$('.alert-success').delay(500).fadeIn();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImJsb2cuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdnb29kbWFuX2FwcCcsIFtdKTtcblxuYXBwLmNvbnRyb2xsZXIoJ05hdkNvbnRyb2xsZXInLCBbJyRodHRwJywgJyRzY29wZScsICckbG9jYXRpb24nLGZ1bmN0aW9uKCRodHRwLCAkc2NvcGUsICRsb2NhdGlvbikge1xuICAvL3RoaXMudGVzdCA9ICdZbyBZbywgaXRzIHdvcmtpbmcnO1xuXG4gIHRoaXMuZ29UaW1lID0gKHVybCkgPT4ge1xuICAgIGxldCBuYW1lID0gdXJsLnNsaWNlKDgsdXJsLmluZGV4T2YoJy4nKSlcbiAgICBjb25zb2xlLmxvZyhgV2FraW5nIHVwICR7bmFtZX1gKTtcbiAgICAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHVybDogdXJsLFxuICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MnLCByZXNwb25zZSk7XG4gICAgfSwgZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coYCR7bmFtZX0gdXAuYCk7XG4gICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0NhdGNoJykpXG4gIH07XG5cbiAgdGhpcy51cmxzID0gW1xuICAgICdodHRwczovL3Rvb2xpZWJveC1hcGkuaGVyb2t1YXBwLmNvbScsXG4gICAgJ2h0dHBzOi8vdGltZXNoZWV0cy1pby5oZXJva3VhcHAuY29tLycsXG4gICAgJ2h0dHBzOi8vZG90dGktYWdlbmN5Lmhlcm9rdWFwcC5jb20vJyxcbiAgICAnaHR0cHM6Ly94Y3Vyc2lvbi5oZXJva3VhcHAuY29tLydcbiAgXVxuXG4gIGlmICgkbG9jYXRpb24uYWJzVXJsKCkuc2xpY2UoNywgMTYpICE9ICdsb2NhbGhvc3QnKSB7XG4gICAgZm9yIChsZXQgdXJsIG9mIHRoaXMudXJscykge1xuICAgICAgdGhpcy5nb1RpbWUodXJsKTtcbiAgICB9XG4gIH07XG5cbn1dKTtcbiIsImFwcC5jb250cm9sbGVyKCdCbG9nQ29udHJvbGxlcicsIFsnJGh0dHAnLCAnJHNjb3BlJywgJyRsb2NhdGlvbicsZnVuY3Rpb24oJGh0dHAsICRzY29wZSwgJGxvY2F0aW9uKSB7XG4gIHRoaXMubG9hZGVkID0gZmFsc2U7XG4gIHRoaXMuY29tbWVudHMgPSBbXTtcblxuICB0aGlzLmdldENvbW1lbnRzID0gKGl0ZW0pID0+IHtcbiAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICB1cmw6IGAvYmxvZy8ke2l0ZW19YFxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICB0aGlzLmNvbW1lbnRzID0gcmVzcG9uc2UuZGF0YS5jb21tZW50cztcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0NhdGNoJywgZXJyKSk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuc3VibWl0ID0gKG5ld0luZm8sIGl0ZW0pID0+IHtcbiAgICBibG9nVmFsaWRhdGUoKTtcbiAgICBpZiAoXG4gICAgICBuZXdJbmZvLm5hbWUgJiZcbiAgICAgIG5ld0luZm8uZW1haWwgJiZcbiAgICAgIG5ld0luZm8uY29tbWVudFxuICAgICkge1xuICAgICAgbmV3SW5mby5ibG9nID0gaXRlbTtcbiAgICAgICRodHRwKHtcbiAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICB1cmw6IGAvYmxvZ2AsXG4gICAgICAgICAgZGF0YTogbmV3SW5mb1xuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICB0aGlzLmNvbW1lbnRzLnB1c2gocmVzcG9uc2UuZGF0YS5uZXcpO1xuICAgICAgICAgIGJsb2dTdWNjZXNzKCk7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5jb21tZW50cyk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0NhdGNoJywgZXJyKSk7XG4gICAgfVxuICB9O1xuXG59XSk7XG4iLCJjb25zdCBibG9nVmFsaWRhdGUgPSAoKSA9PiB7XHJcblx0JCgnI2Jsb2ctZm9ybScpLnN1Ym1pdCgpO1xyXG59O1xyXG5cclxuY29uc3QgYmxvZ1N1Y2Nlc3MgPSAoKSA9PiB7XHJcblx0JCgnI2Jsb2ctZm9ybScpLmZhZGVPdXQoKTtcclxuXHQkKCcuYWxlcnQtc3VjY2VzcycpLmRlbGF5KDUwMCkuZmFkZUluKCk7XHJcbn07XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdHZhciB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xyXG5cdHZhciBoZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcblx0JCgnLnNlY3Rpb24uc3RhcnRlZCcpLmNzcyh7J2hlaWdodCc6aGVpZ2h0fSk7XHJcblxyXG5cdGxldCBkZXZNb2RlID0gZmFsc2U7XHJcblx0bGV0IHBhdGhuYW1lID0gd2luZG93LmxvY2F0aW9uLmhvc3Q7XHJcblx0cGF0aG5hbWUgPSBwYXRobmFtZS5zbGljZSgwLDkpXHJcblx0aWYgKHBhdGhuYW1lID09PSAnbG9jYWxob3N0Jykge1xyXG5cdFx0Y29uc29sZS5sb2coJ2Rldk1vZGU6ICcsIHBhdGhuYW1lKTtcclxuXHRcdGRldk1vZGUgPSB0cnVlO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zb2xlLmxvZygncHJvZHVjdGlvbjogJywgcGF0aG5hbWUpO1xyXG5cdH1cclxuXHJcblx0LyogUHJlbG9hZGVyICovXHJcblx0JCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKFwiLnByZWxvYWRlciAuc3Bpbm5lclwiKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygncmVhZHknKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBUeXBlZCBzdWJ0aXRsZSAqL1xyXG5cdCQoJy50eXBlZC10aXRsZScpLnR5cGVkKHtcclxuXHRcdHN0cmluZ3NFbGVtZW50OiAkKCcudHlwaW5nLXRpdGxlJyksXHJcblx0XHRiYWNrRGVsYXk6IDMwMDAsIC8qIERlbGF5IGluIHRleHQgY2hhbmdlICovXHJcblx0XHR0eXBlU3BlZWQ6IDIwLCAvKiBUeXBpbmcgc3BlZWQgKi9cclxuXHRcdGxvb3A6IHRydWVcclxuXHR9KTtcclxuXHJcblx0Ly8gLyogWW91dHViZSB2aWRlbyBiYWNrZ3JvdW5kICovXHJcblx0Ly8gdmFyIG15UGxheWVyID0gJChcIiN2aWRlby1iZ1wiKS5ZVFBsYXllcigpO1xyXG5cclxuXHQvKiBTbW9vdGhzY3JvbGwgKi9cclxuXHRpZigkKCcuc2VjdGlvbi5zdGFydGVkJykubGVuZ3RoKSB7XHJcblx0XHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBzY3JvbGxQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAxNTA7XHJcblx0XHRcdC8vY29uc29sZS5sb2coc2Nyb2xsUG9zKTtcclxuXHRcdFx0JCgnLnRvcC1tZW51IHVsIGxpIGEnKVxyXG5cdFx0XHQuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJMaW5rID0gJCh0aGlzKTtcclxuXHRcdFx0XHR2YXIgcmVmRWxlbWVudCA9ICQoY3VyckxpbmsuYXR0cihcImhyZWZcIikpO1xyXG5cdFx0XHRcdHZhciBvZmZzZXQgPSByZWZFbGVtZW50Lm9mZnNldCgpLnRvcFxyXG5cdFx0XHRcdGlmICggb2Zmc2V0IDw9IHNjcm9sbFBvcykge1xyXG5cdFx0XHRcdFx0JCgnLnRvcC1tZW51IHVsIGxpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhjdXJyTGluay5wYXJlbnQoKSk7XHJcblx0XHRcdFx0XHRjdXJyTGluay5wYXJlbnQoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKiBUb3AgTWVudSAqL1xyXG5cdGlmKCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5sZW5ndGgpIHtcclxuXHRcdGxldCBtZW51ID0gJCgnLnRvcC1tZW51IHVsIGxpIGEnKVxyXG5cdFx0bWVudS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRvcGVuU2lkZU5hdigpO1xyXG5cdFx0XHR2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0dmFyIGggPSBwYXJzZUZsb2F0KCQoaWQpLm9mZnNldCgpLnRvcCk7XHJcblxyXG5cdFx0XHQkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuXHRcdFx0XHRzY3JvbGxUb3A6IGggLSA2NVxyXG5cdFx0XHR9LCA4MDApO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IG9wZW5TaWRlTmF2ID0gKCkgPT4ge1xyXG5cdFx0aWYoJCgnLnRvcC1tZW51JykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdFx0JCgnLnRvcC1tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy50b3AtbWVudScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyogT3BlbiBUb3AgTWVudSAqL1xyXG5cdCQoJy5wYWdlJykub24oJ2NsaWNrJywgJy5tZW51LWJ0bicsIG9wZW5TaWRlTmF2KTtcclxuXHQkKCcuY2xvc2UnKS5vbignY2xpY2snLCBvcGVuU2lkZU5hdik7XHJcblx0LyogSGlkZSBtb3VzZSBidXR0b24gb24gc2Nyb2xsICovXHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcubW91c2UtYnRuJykuZmFkZU91dCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPD0gaGVpZ2h0LTEwKSB7XHJcblx0XHRcdCQoJy5tb3VzZS1idG4nKS5mYWRlSW4oKTtcclxuXHRcdH1cclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcudG9wLW1lbnUgdWwgbGknKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gLyogUGF1c2UvUGxheSB2aWRlbyBvbiBzY3JvbGwgKi9cclxuXHQvLyBpZiAoJCgnI3ZpZGVvLWJnJykubGVuZ3RoKSB7XHJcblx0Ly8gXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdC8vIFx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSBoZWlnaHQtMTApIHtcclxuXHQvLyBcdFx0XHQkKCcjdmlkZW8tYmcnKS5ZVFBQYXVzZSgpO1xyXG5cdC8vIFx0XHR9XHJcblx0Ly8gXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdC8vIFx0XHRcdCQoJyN2aWRlby1iZycpLllUUFBsYXkoKTtcclxuXHQvLyBcdFx0fVxyXG5cdC8vIFx0fSk7XHJcblx0Ly8gfVxyXG5cclxuXHQvKiBPbiBjbGljayBtb3VzZSBidXR0b24sIHBhZ2Ugc2Nyb2xsIGRvd24gKi9cclxuXHQkKCcuc2VjdGlvbicpLm9uKCdjbGljaycsICcubW91c2UtYnRuJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuXHRcdFx0c2Nyb2xsVG9wOiBoZWlnaHRcclxuXHRcdH0sIDgwMCk7XHJcblx0fSk7XHJcblxyXG5cdC8qIE1lbnUgZmlsbGVkICovXHJcblx0aWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMTAwKSB7XHJcblx0XHQkKCdoZWFkZXInKS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuXHR9XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDEwMCkge1xyXG5cdFx0XHQkKCdoZWFkZXInKS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIEluaXRpYWxpemUgbWFzb25yeSBpdGVtcyAqL1xyXG5cdHZhciAkY29udGFpbmVyID0gJCgnLmJveC1pdGVtcycpO1xyXG5cclxuXHQkY29udGFpbmVyLmltYWdlc0xvYWRlZChmdW5jdGlvbigpIHtcclxuXHRcdCRjb250YWluZXIubXVsdGlwbGVGaWx0ZXJNYXNvbnJ5KHtcclxuXHRcdFx0aXRlbVNlbGVjdG9yOiAnLmJveC1pdGVtJyxcclxuXHRcdFx0ZmlsdGVyc0dyb3VwU2VsZWN0b3I6ICcuZmlsdGVycycsXHJcblx0XHRcdHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcclxuXHRcdFx0Z3V0dGVyOiAwXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8qIDEyLiBJbml0aWFsaXplIG1hc29ucnkgZmlsdGVyICovXHJcblx0JCgnLmZpbHRlcnMgbGFiZWwnKS5vbignY2hhbmdlJywgJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coJ3J1bm5pbmcnKTtcclxuXHRcdGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdCQoJy5mX2J0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuZl9idG4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0XHQvKiBSZWZyZXNoIFBvcnRmb2xpbyBtYWduaWZpYyBwb3B1cCAqL1xyXG5cdFx0JCgnLmhhcy1wb3B1cCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0XHR0eXBlOiAnaW5saW5lJyxcclxuXHRcdFx0b3ZlcmZsb3dZOiAnYXV0bycsXHJcblx0XHRcdGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG5cdFx0XHRtYWluQ2xhc3M6ICdtZnAtZmFkZScsXHJcblx0XHRcdGNhbGxiYWNrczoge1xyXG5cdFx0ICAgIG9wZW46IGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgICAgY29uc29sZS5sb2coJ3dha2UgdXAgc2VydmVyIGYoeCknKTtcclxuXHRcdFx0XHRcdGlmICghZGV2TW9kZSkgd2FrZVVwKHNlcnZlclVSTHNbdGhpcy5jdXJySXRlbS5zcmNdKTtcclxuXHRcdCAgICB9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBQb3J0Zm9saW8gbWFnbmlmaWMgcG9wdXAgKi9cclxuXHQkKCcuaGFzLXBvcHVwJykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHR0eXBlOiAnaW5saW5lJyxcclxuXHRcdG92ZXJmbG93WTogJ2F1dG8nLFxyXG5cdFx0Y2xvc2VCdG5JbnNpZGU6IHRydWUsXHJcblx0XHRtYWluQ2xhc3M6ICdtZnAtZmFkZScsXHJcblx0XHRjYWxsYmFja3M6IHtcclxuXHQgICAgb3BlbjogZnVuY3Rpb24oKSB7XHJcblx0ICAgICAgLy8gY29uc29sZS5sb2coJ3dha2UgdXAgc2VydmVyIGYoeCknKTtcclxuXHRcdFx0XHQvLyBpZiAoIWRldk1vZGUpIHdha2VVcChzZXJ2ZXJVUkxzW3RoaXMuY3Vyckl0ZW0uc3JjXSk7XHJcblx0ICAgIH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogZ2FsbGVyeSAqL1xyXG5cdCQoJy5wb3N0LWxpZ2h0Ym94JykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHRkZWxlZ2F0ZTogJ2EnLFxyXG5cdFx0dHlwZTogJ2ltYWdlJyxcclxuXHRcdHRMb2FkaW5nOiAnTG9hZGluZyBpbWFnZSAjJWN1cnIlLi4uJyxcclxuXHRcdG1haW5DbGFzczogJ21mcC1pbWctbW9iaWxlJyxcclxuXHRcdGdhbGxlcnk6IHtcclxuXHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0bmF2aWdhdGVCeUltZ0NsaWNrOiB0cnVlLFxyXG5cdFx0XHRwcmVsb2FkOiBbMCwxXSAvLyBXaWxsIHByZWxvYWQgMCAtIGJlZm9yZSBjdXJyZW50LCBhbmQgMSBhZnRlciB0aGUgY3VycmVudCBpbWFnZVxyXG5cdFx0fSxcclxuXHRcdGltYWdlOiB7XHJcblx0XHRcdHRFcnJvcjogJzxhIGhyZWY9XCIldXJsJVwiPlRoZSBpbWFnZSAjJWN1cnIlPC9hPiBjb3VsZCBub3QgYmUgbG9hZGVkLidcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogVmFsaWRhdGUgY29udGFjdCBmb3JtICovXHJcblx0JChcIiNjZm9ybVwiKS52YWxpZGF0ZSh7XHJcblx0XHRydWxlczoge1xyXG5cdFx0XHRuYW1lOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0dGVsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0bWVzc2FnZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1YmplY3Q6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbWFpbDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxyXG5cdFx0XHRcdGVtYWlsOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBcInZhbGlkXCIsXHJcblx0XHRzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3llcCEhJyk7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnY29udGFjdCcsXHJcblx0XHRcdFx0dHlwZTogJ3Bvc3QnLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXHJcblx0XHRcdFx0ZGF0YTogJ25hbWU9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpLnZhbCgpICsgJyZ0ZWw9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwidGVsXCJdJykudmFsKCkgKyAnJmVtYWlsPScrICQoXCIjY2Zvcm1cIikuZmluZCgnaW5wdXRbbmFtZT1cImVtYWlsXCJdJykudmFsKCkgKyAnJnN1YmplY3Q9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwic3ViamVjdFwiXScpLnZhbCgpICsgJyZtZXNzYWdlPScgKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ3RleHRhcmVhW25hbWU9XCJtZXNzYWdlXCJdJykudmFsKCksXHJcblx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdCQoJyNjZm9ybScpLmZhZGVPdXQoKTtcclxuXHRcdFx0XHRcdCQoJy5hbGVydC1zdWNjZXNzJykuZGVsYXkoNTAwKS5mYWRlSW4oKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2Vycm9yIGYoeCknKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIFZhbGlkYXRlIGNvbnRhY3QgZm9ybSAqL1xyXG5cdCQoXCIjYmxvZy1mb3JtXCIpLnZhbGlkYXRlKHtcclxuXHRcdHJ1bGVzOiB7XHJcblx0XHRcdG5hbWU6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtZXNzYWdlOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0ZW1haWw6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcclxuXHRcdFx0XHRlbWFpbDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogXCJ2YWxpZFwiLFxyXG5cdFx0c3VibWl0SGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCd5ZXAgeWVwISEnKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyAkKCcjYmxvZy1mb3JtJykuZmFkZU91dCgpO1xyXG5cdFx0XHQvLyAkKCcuYWxlcnQtc3VjY2VzcycpLmRlbGF5KDEwMDApLmZhZGVJbigpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCBzZXJ2ZXJVUkxzID0ge1xyXG5cdFx0XCIjYm9welwiOiAnaHR0cHM6Ly9idXNpbmVzcy1vcHouaGVyb2t1YXBwLmNvbS8nLFxyXG5cdFx0XCIjZG90dGlcIjogJ2h0dHBzOi8vZG90dGktYWdlbmN5Lmhlcm9rdWFwcC5jb20vJyxcclxuXHRcdFwiI3hjXCI6ICdodHRwczovL3hjdXJzaW9uLmhlcm9rdWFwcC5jb20vJyxcclxuXHRcdFwiI3Rvb2xpZVwiOiAnaHR0cHM6Ly90b29saWVib3guaGVyb2t1YXBwLmNvbS8nLFxyXG5cdFx0XCIjc2FpbG9yc1wiOiAnaHR0cHM6Ly90Zzk3MC5naXRodWIuaW8vdGcuY29tLycsXHJcblx0XHRcIiN0aW1lXCI6ICdodHRwczovL3RpbWVzaGVldHMtaW8uaGVyb2t1YXBwLmNvbS8nXHJcblx0fVxyXG5cclxuXHQvL3dha2UgdXAgcHJvamVjdCBzZXJ2ZXJzXHJcblx0Y29uc3Qgd2FrZVVwID0gKHVybCkgPT4ge1xyXG5cdFx0Y29uc29sZS5sb2coJ3dha2UgdXAgcnVubmluZycsIHVybCk7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnanEgYWpheCBjYWxsIHN1Y2Nlc3MnKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24oeGhyKSB7XHJcblx0ICAgICAgY29uc29sZS5sb2coJ2FqYXggZXJyb3InKTtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHhocik7XHJcblx0ICAgIH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdC8vd2FrZVVwKCdodHRwczovL2RyeWhvbGxvdy5oZXJva3VhcHAuY29tLycpO1xyXG5cclxufSk7XHJcbiJdfQ==
