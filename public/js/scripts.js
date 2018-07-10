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

  this.submit = (newInfo) => {
    console.log(newInfo);
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

}]);

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
			$('#blog-form').fadeOut();
			$('.alert-success').delay(1000).fadeIn();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImJsb2cuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2dvb2RtYW5fYXBwJywgW10pO1xuXG5hcHAuY29udHJvbGxlcignTmF2Q29udHJvbGxlcicsIFsnJGh0dHAnLCAnJHNjb3BlJywgJyRsb2NhdGlvbicsZnVuY3Rpb24oJGh0dHAsICRzY29wZSwgJGxvY2F0aW9uKSB7XG4gIC8vdGhpcy50ZXN0ID0gJ1lvIFlvLCBpdHMgd29ya2luZyc7XG5cbiAgdGhpcy5nb1RpbWUgPSAodXJsKSA9PiB7XG4gICAgbGV0IG5hbWUgPSB1cmwuc2xpY2UoOCx1cmwuaW5kZXhPZignLicpKVxuICAgIGNvbnNvbGUubG9nKGBXYWtpbmcgdXAgJHtuYW1lfWApO1xuICAgICRodHRwKHtcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc3VjY2VzcycsIHJlc3BvbnNlKTtcbiAgICB9LCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSB1cC5gKTtcbiAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcignQ2F0Y2gnKSlcbiAgfTtcblxuICB0aGlzLnVybHMgPSBbXG4gICAgJ2h0dHBzOi8vdG9vbGllYm94LWFwaS5oZXJva3VhcHAuY29tJyxcbiAgICAnaHR0cHM6Ly90aW1lc2hlZXRzLWlvLmhlcm9rdWFwcC5jb20vJyxcbiAgICAnaHR0cHM6Ly9kb3R0aS1hZ2VuY3kuaGVyb2t1YXBwLmNvbS8nLFxuICAgICdodHRwczovL3hjdXJzaW9uLmhlcm9rdWFwcC5jb20vJ1xuICBdXG5cbiAgaWYgKCRsb2NhdGlvbi5hYnNVcmwoKS5zbGljZSg3LCAxNikgIT0gJ2xvY2FsaG9zdCcpIHtcbiAgICBmb3IgKGxldCB1cmwgb2YgdGhpcy51cmxzKSB7XG4gICAgICB0aGlzLmdvVGltZSh1cmwpO1xuICAgIH1cbiAgfTtcblxufV0pO1xuIiwiYXBwLmNvbnRyb2xsZXIoJ0Jsb2dDb250cm9sbGVyJywgWyckaHR0cCcsICckc2NvcGUnLCAnJGxvY2F0aW9uJyxmdW5jdGlvbigkaHR0cCwgJHNjb3BlLCAkbG9jYXRpb24pIHtcblxuICB0aGlzLnN1Ym1pdCA9IChuZXdJbmZvKSA9PiB7XG4gICAgY29uc29sZS5sb2cobmV3SW5mbyk7XG4gICAgJGh0dHAoe1xuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgdXJsOiBgL2Jsb2dgLFxuICAgICAgICBkYXRhOiBuZXdJbmZvXG4gICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0NhdGNoJywgZXJyKSk7XG4gIH1cblxufV0pO1xuIiwiJChmdW5jdGlvbiAoKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHR2YXIgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHR2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cdCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5jc3MoeydoZWlnaHQnOmhlaWdodH0pO1xyXG5cclxuXHRsZXQgZGV2TW9kZSA9IGZhbHNlO1xyXG5cdGxldCBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xyXG5cdHBhdGhuYW1lID0gcGF0aG5hbWUuc2xpY2UoMCw5KVxyXG5cdGlmIChwYXRobmFtZSA9PT0gJ2xvY2FsaG9zdCcpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdkZXZNb2RlOiAnLCBwYXRobmFtZSk7XHJcblx0XHRkZXZNb2RlID0gdHJ1ZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Y29uc29sZS5sb2coJ3Byb2R1Y3Rpb246ICcsIHBhdGhuYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qIFByZWxvYWRlciAqL1xyXG5cdCQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0JChcIi5wcmVsb2FkZXIgLnNwaW5uZXJcIikuZmFkZU91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ3JlYWR5Jyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyogVHlwZWQgc3VidGl0bGUgKi9cclxuXHQkKCcudHlwZWQtdGl0bGUnKS50eXBlZCh7XHJcblx0XHRzdHJpbmdzRWxlbWVudDogJCgnLnR5cGluZy10aXRsZScpLFxyXG5cdFx0YmFja0RlbGF5OiAzMDAwLCAvKiBEZWxheSBpbiB0ZXh0IGNoYW5nZSAqL1xyXG5cdFx0dHlwZVNwZWVkOiAyMCwgLyogVHlwaW5nIHNwZWVkICovXHJcblx0XHRsb29wOiB0cnVlXHJcblx0fSk7XHJcblxyXG5cdC8vIC8qIFlvdXR1YmUgdmlkZW8gYmFja2dyb3VuZCAqL1xyXG5cdC8vIHZhciBteVBsYXllciA9ICQoXCIjdmlkZW8tYmdcIikuWVRQbGF5ZXIoKTtcclxuXHJcblx0LyogU21vb3Roc2Nyb2xsICovXHJcblx0aWYoJCgnLnNlY3Rpb24uc3RhcnRlZCcpLmxlbmd0aCkge1xyXG5cdFx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgc2Nyb2xsUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgMTUwO1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKHNjcm9sbFBvcyk7XHJcblx0XHRcdCQoJy50b3AtbWVudSB1bCBsaSBhJylcclxuXHRcdFx0LmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBjdXJyTGluayA9ICQodGhpcyk7XHJcblx0XHRcdFx0dmFyIHJlZkVsZW1lbnQgPSAkKGN1cnJMaW5rLmF0dHIoXCJocmVmXCIpKTtcclxuXHRcdFx0XHR2YXIgb2Zmc2V0ID0gcmVmRWxlbWVudC5vZmZzZXQoKS50b3BcclxuXHRcdFx0XHRpZiAoIG9mZnNldCA8PSBzY3JvbGxQb3MpIHtcclxuXHRcdFx0XHRcdCQoJy50b3AtbWVudSB1bCBsaS5hY3RpdmUnKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coY3VyckxpbmsucGFyZW50KCkpO1xyXG5cdFx0XHRcdFx0Y3VyckxpbmsucGFyZW50KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyogVG9wIE1lbnUgKi9cclxuXHRpZigkKCcuc2VjdGlvbi5zdGFydGVkJykubGVuZ3RoKSB7XHJcblx0XHRsZXQgbWVudSA9ICQoJy50b3AtbWVudSB1bCBsaSBhJylcclxuXHRcdG1lbnUub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0b3BlblNpZGVOYXYoKTtcclxuXHRcdFx0dmFyIGlkID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblx0XHRcdHZhciBoID0gcGFyc2VGbG9hdCgkKGlkKS5vZmZzZXQoKS50b3ApO1xyXG5cclxuXHRcdFx0JCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcblx0XHRcdFx0c2Nyb2xsVG9wOiBoIC0gNjVcclxuXHRcdFx0fSwgODAwKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjb25zdCBvcGVuU2lkZU5hdiA9ICgpID0+IHtcclxuXHRcdGlmKCQoJy50b3AtbWVudScpLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdCQoJy50b3AtbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcudG9wLW1lbnUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qIE9wZW4gVG9wIE1lbnUgKi9cclxuXHQkKCcucGFnZScpLm9uKCdjbGljaycsICcubWVudS1idG4nLCBvcGVuU2lkZU5hdik7XHJcblx0JCgnLmNsb3NlJykub24oJ2NsaWNrJywgb3BlblNpZGVOYXYpO1xyXG5cdC8qIEhpZGUgbW91c2UgYnV0dG9uIG9uIHNjcm9sbCAqL1xyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSBoZWlnaHQtMTApIHtcclxuXHRcdFx0JCgnLm1vdXNlLWJ0bicpLmZhZGVPdXQoKTtcclxuXHRcdH1cclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcubW91c2UtYnRuJykuZmFkZUluKCk7XHJcblx0XHR9XHJcblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8PSBoZWlnaHQtMTApIHtcclxuXHRcdFx0JCgnLnRvcC1tZW51IHVsIGxpJykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIC8qIFBhdXNlL1BsYXkgdmlkZW8gb24gc2Nyb2xsICovXHJcblx0Ly8gaWYgKCQoJyN2aWRlby1iZycpLmxlbmd0aCkge1xyXG5cdC8vIFx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHQvLyBcdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gaGVpZ2h0LTEwKSB7XHJcblx0Ly8gXHRcdFx0JCgnI3ZpZGVvLWJnJykuWVRQUGF1c2UoKTtcclxuXHQvLyBcdFx0fVxyXG5cdC8vIFx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8PSBoZWlnaHQtMTApIHtcclxuXHQvLyBcdFx0XHQkKCcjdmlkZW8tYmcnKS5ZVFBQbGF5KCk7XHJcblx0Ly8gXHRcdH1cclxuXHQvLyBcdH0pO1xyXG5cdC8vIH1cclxuXHJcblx0LyogT24gY2xpY2sgbW91c2UgYnV0dG9uLCBwYWdlIHNjcm9sbCBkb3duICovXHJcblx0JCgnLnNlY3Rpb24nKS5vbignY2xpY2snLCAnLm1vdXNlLWJ0bicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcblx0XHRcdHNjcm9sbFRvcDogaGVpZ2h0XHJcblx0XHR9LCA4MDApO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBNZW51IGZpbGxlZCAqL1xyXG5cdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDEwMCkge1xyXG5cdFx0JCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcblx0fVxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAxMDApIHtcclxuXHRcdFx0JCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBJbml0aWFsaXplIG1hc29ucnkgaXRlbXMgKi9cclxuXHR2YXIgJGNvbnRhaW5lciA9ICQoJy5ib3gtaXRlbXMnKTtcclxuXHJcblx0JGNvbnRhaW5lci5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKSB7XHJcblx0XHQkY29udGFpbmVyLm11bHRpcGxlRmlsdGVyTWFzb25yeSh7XHJcblx0XHRcdGl0ZW1TZWxlY3RvcjogJy5ib3gtaXRlbScsXHJcblx0XHRcdGZpbHRlcnNHcm91cFNlbGVjdG9yOiAnLmZpbHRlcnMnLFxyXG5cdFx0XHRwZXJjZW50UG9zaXRpb246IHRydWUsXHJcblx0XHRcdGd1dHRlcjogMFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKiAxMi4gSW5pdGlhbGl6ZSBtYXNvbnJ5IGZpbHRlciAqL1xyXG5cdCQoJy5maWx0ZXJzIGxhYmVsJykub24oJ2NoYW5nZScsICdpbnB1dFt0eXBlPVwicmFkaW9cIl0nLCBmdW5jdGlvbigpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKCdydW5uaW5nJyk7XHJcblx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHQkKCcuZl9idG4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykuY2xvc2VzdCgnLmZfYnRuJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdFx0LyogUmVmcmVzaCBQb3J0Zm9saW8gbWFnbmlmaWMgcG9wdXAgKi9cclxuXHRcdCQoJy5oYXMtcG9wdXAnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdFx0dHlwZTogJ2lubGluZScsXHJcblx0XHRcdG92ZXJmbG93WTogJ2F1dG8nLFxyXG5cdFx0XHRjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuXHRcdFx0bWFpbkNsYXNzOiAnbWZwLWZhZGUnLFxyXG5cdFx0XHRjYWxsYmFja3M6IHtcclxuXHRcdCAgICBvcGVuOiBmdW5jdGlvbigpIHtcclxuXHRcdCAgICAgIGNvbnNvbGUubG9nKCd3YWtlIHVwIHNlcnZlciBmKHgpJyk7XHJcblx0XHRcdFx0XHRpZiAoIWRldk1vZGUpIHdha2VVcChzZXJ2ZXJVUkxzW3RoaXMuY3Vyckl0ZW0uc3JjXSk7XHJcblx0XHQgICAgfVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyogUG9ydGZvbGlvIG1hZ25pZmljIHBvcHVwICovXHJcblx0JCgnLmhhcy1wb3B1cCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0dHlwZTogJ2lubGluZScsXHJcblx0XHRvdmVyZmxvd1k6ICdhdXRvJyxcclxuXHRcdGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG5cdFx0bWFpbkNsYXNzOiAnbWZwLWZhZGUnLFxyXG5cdFx0Y2FsbGJhY2tzOiB7XHJcblx0ICAgIG9wZW46IGZ1bmN0aW9uKCkge1xyXG5cdCAgICAgIC8vIGNvbnNvbGUubG9nKCd3YWtlIHVwIHNlcnZlciBmKHgpJyk7XHJcblx0XHRcdFx0Ly8gaWYgKCFkZXZNb2RlKSB3YWtlVXAoc2VydmVyVVJMc1t0aGlzLmN1cnJJdGVtLnNyY10pO1xyXG5cdCAgICB9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIGdhbGxlcnkgKi9cclxuXHQkKCcucG9zdC1saWdodGJveCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0ZGVsZWdhdGU6ICdhJyxcclxuXHRcdHR5cGU6ICdpbWFnZScsXHJcblx0XHR0TG9hZGluZzogJ0xvYWRpbmcgaW1hZ2UgIyVjdXJyJS4uLicsXHJcblx0XHRtYWluQ2xhc3M6ICdtZnAtaW1nLW1vYmlsZScsXHJcblx0XHRnYWxsZXJ5OiB7XHJcblx0XHRcdGVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdG5hdmlnYXRlQnlJbWdDbGljazogdHJ1ZSxcclxuXHRcdFx0cHJlbG9hZDogWzAsMV0gLy8gV2lsbCBwcmVsb2FkIDAgLSBiZWZvcmUgY3VycmVudCwgYW5kIDEgYWZ0ZXIgdGhlIGN1cnJlbnQgaW1hZ2VcclxuXHRcdH0sXHJcblx0XHRpbWFnZToge1xyXG5cdFx0XHR0RXJyb3I6ICc8YSBocmVmPVwiJXVybCVcIj5UaGUgaW1hZ2UgIyVjdXJyJTwvYT4gY291bGQgbm90IGJlIGxvYWRlZC4nXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIFZhbGlkYXRlIGNvbnRhY3QgZm9ybSAqL1xyXG5cdCQoXCIjY2Zvcm1cIikudmFsaWRhdGUoe1xyXG5cdFx0cnVsZXM6IHtcclxuXHRcdFx0bmFtZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdHRlbDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdG1lc3NhZ2U6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWJqZWN0OiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0ZW1haWw6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcclxuXHRcdFx0XHRlbWFpbDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogXCJ2YWxpZFwiLFxyXG5cdFx0c3VibWl0SGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnY29udGFjdCcsXHJcblx0XHRcdFx0dHlwZTogJ3Bvc3QnLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXHJcblx0XHRcdFx0ZGF0YTogJ25hbWU9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpLnZhbCgpICsgJyZ0ZWw9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwidGVsXCJdJykudmFsKCkgKyAnJmVtYWlsPScrICQoXCIjY2Zvcm1cIikuZmluZCgnaW5wdXRbbmFtZT1cImVtYWlsXCJdJykudmFsKCkgKyAnJnN1YmplY3Q9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwic3ViamVjdFwiXScpLnZhbCgpICsgJyZtZXNzYWdlPScgKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ3RleHRhcmVhW25hbWU9XCJtZXNzYWdlXCJdJykudmFsKCksXHJcblx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdCQoJyNjZm9ybScpLmZhZGVPdXQoKTtcclxuXHRcdFx0XHRcdCQoJy5hbGVydC1zdWNjZXNzJykuZGVsYXkoMTAwMCkuZmFkZUluKCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdlcnJvciBmKHgpJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBWYWxpZGF0ZSBjb250YWN0IGZvcm0gKi9cclxuXHQkKFwiI2Jsb2ctZm9ybVwiKS52YWxpZGF0ZSh7XHJcblx0XHRydWxlczoge1xyXG5cdFx0XHRuYW1lOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0bWVzc2FnZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdGVtYWlsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXHJcblx0XHRcdFx0ZW1haWw6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IFwidmFsaWRcIixcclxuXHRcdHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjYmxvZy1mb3JtJykuZmFkZU91dCgpO1xyXG5cdFx0XHQkKCcuYWxlcnQtc3VjY2VzcycpLmRlbGF5KDEwMDApLmZhZGVJbigpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCBzZXJ2ZXJVUkxzID0ge1xyXG5cdFx0XCIjYm9welwiOiAnaHR0cHM6Ly9idXNpbmVzcy1vcHouaGVyb2t1YXBwLmNvbS8nLFxyXG5cdFx0XCIjZG90dGlcIjogJ2h0dHBzOi8vZG90dGktYWdlbmN5Lmhlcm9rdWFwcC5jb20vJyxcclxuXHRcdFwiI3hjXCI6ICdodHRwczovL3hjdXJzaW9uLmhlcm9rdWFwcC5jb20vJyxcclxuXHRcdFwiI3Rvb2xpZVwiOiAnaHR0cHM6Ly90b29saWVib3guaGVyb2t1YXBwLmNvbS8nLFxyXG5cdFx0XCIjc2FpbG9yc1wiOiAnaHR0cHM6Ly90Zzk3MC5naXRodWIuaW8vdGcuY29tLycsXHJcblx0XHRcIiN0aW1lXCI6ICdodHRwczovL3RpbWVzaGVldHMtaW8uaGVyb2t1YXBwLmNvbS8nXHJcblx0fVxyXG5cclxuXHQvL3dha2UgdXAgcHJvamVjdCBzZXJ2ZXJzXHJcblx0Y29uc3Qgd2FrZVVwID0gKHVybCkgPT4ge1xyXG5cdFx0Y29uc29sZS5sb2coJ3dha2UgdXAgcnVubmluZycsIHVybCk7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnanEgYWpheCBjYWxsIHN1Y2Nlc3MnKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24oeGhyKSB7XHJcblx0ICAgICAgY29uc29sZS5sb2coJ2FqYXggZXJyb3InKTtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHhocik7XHJcblx0ICAgIH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdC8vd2FrZVVwKCdodHRwczovL2RyeWhvbGxvdy5oZXJva3VhcHAuY29tLycpO1xyXG5cclxufSk7XHJcbiJdfQ==
