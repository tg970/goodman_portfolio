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

/**
*	Hendrix (HTML)
*	Copyright © Hendrix by beshleyua. All Rights Reserved.
**/

$(function () {
	'use strict';

	var width;
	var height;
	let devMode = false;
	let pathname = window.location.host;
	if (pathname === 'localhost:1122') {
		console.log('devMode');
		devMode = true;
	}

		/* Smoothscroll */
	const smooth = () => {
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
	}

	/* Preloader */
	$(window).on('load', function() {
		width = $(window).width();
		height = $(window).height();
		$('.section.started').css({'height':height});
		smooth();
		$(".preloader .spinner").fadeOut(function(){
			$('.preloader').fadeOut();
			$('body').addClass('ready');
		});
	});

	/* Typed subtitle */
	$('.typed-title').typed({
		stringsElement: $('.typing-title'),
		backDelay: 5000, /* Delay in text change */
		typeSpeed: 20, /* Typing speed */
		loop: true
	});

	// /* Youtube video background */
	// var myPlayer = $("#video-bg").YTPlayer();




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
	      console.log('wake up server f(x)');
				if (!devMode) wakeUp(serverURLs[this.currItem.src]);
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
				url: 'mailer/feedback.php',
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdnb29kbWFuX2FwcCcsIFtdKTsgLy8nbmdSb3V0ZSdcblxuYXBwLmNvbnRyb2xsZXIoJ05hdkNvbnRyb2xsZXInLCBbJyRodHRwJywgJyRzY29wZScsICckbG9jYXRpb24nLCBmdW5jdGlvbigkaHR0cCwgJHNjb3BlLCAkbG9jYXRpb24pIHtcbiAgdGhpcy50ZXN0ID0gJ1lvIFlvLCBpdHMgd29ya2luZyc7XG59XSk7XG5cblxuLy8gYXBwLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywnJGxvY2F0aW9uUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlciwkbG9jYXRpb25Qcm92aWRlcikge1xuLy8gICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoeyBlbmFibGVkOiB0cnVlIH0pO1xuLy9cbi8vICAgJHJvdXRlUHJvdmlkZXIud2hlbignLycsIHtcbi8vICAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2hvbWUuaHRtbCcsXG4vLyAgICAgLy8gY29udHJvbGxlcjogJ05hdkNvbnRyb2xsZXIgYXMgY3RybCcsXG4vLyAgICAgLy8gY29udHJvbGxlckFzOiAnY3RybCdcbi8vICAgfSk7XG4vL1xuLy8gfV0pO1xuIiwiLyoqXHJcbipcdEhlbmRyaXggKEhUTUwpXHJcbipcdENvcHlyaWdodCDCqSBIZW5kcml4IGJ5IGJlc2hsZXl1YS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuKiovXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdHZhciB3aWR0aDtcclxuXHR2YXIgaGVpZ2h0O1xyXG5cdGxldCBkZXZNb2RlID0gZmFsc2U7XHJcblx0bGV0IHBhdGhuYW1lID0gd2luZG93LmxvY2F0aW9uLmhvc3Q7XHJcblx0aWYgKHBhdGhuYW1lID09PSAnbG9jYWxob3N0OjExMjInKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZGV2TW9kZScpO1xyXG5cdFx0ZGV2TW9kZSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRcdC8qIFNtb290aHNjcm9sbCAqL1xyXG5cdGNvbnN0IHNtb290aCA9ICgpID0+IHtcclxuXHRcdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHNjcm9sbFBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArIDE1MDtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhzY3JvbGxQb3MpO1xyXG5cdFx0XHQkKCcudG9wLW1lbnUgdWwgbGkgYScpXHJcblx0XHRcdC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR2YXIgY3VyckxpbmsgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdHZhciByZWZFbGVtZW50ID0gJChjdXJyTGluay5hdHRyKFwiaHJlZlwiKSk7XHJcblx0XHRcdFx0dmFyIG9mZnNldCA9IHJlZkVsZW1lbnQub2Zmc2V0KCkudG9wXHJcblx0XHRcdFx0aWYgKCBvZmZzZXQgPD0gc2Nyb2xsUG9zKSB7XHJcblx0XHRcdFx0XHQkKCcudG9wLW1lbnUgdWwgbGkuYWN0aXZlJykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGN1cnJMaW5rLnBhcmVudCgpKTtcclxuXHRcdFx0XHRcdGN1cnJMaW5rLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdC8qIFRvcCBNZW51ICovXHJcblx0XHRpZigkKCcuc2VjdGlvbi5zdGFydGVkJykubGVuZ3RoKSB7XHJcblx0XHRcdGxldCBtZW51ID0gJCgnLnRvcC1tZW51IHVsIGxpIGEnKVxyXG5cdFx0XHRtZW51Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0b3BlblNpZGVOYXYoKTtcclxuXHRcdFx0XHR2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0XHR2YXIgaCA9IHBhcnNlRmxvYXQoJChpZCkub2Zmc2V0KCkudG9wKTtcclxuXHJcblx0XHRcdFx0JCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHRzY3JvbGxUb3A6IGggLSA2NVxyXG5cdFx0XHRcdH0sIDgwMCk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qIFByZWxvYWRlciAqL1xyXG5cdCQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0d2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHRcdGhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHRcdCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5jc3MoeydoZWlnaHQnOmhlaWdodH0pO1xyXG5cdFx0c21vb3RoKCk7XHJcblx0XHQkKFwiLnByZWxvYWRlciAuc3Bpbm5lclwiKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygncmVhZHknKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBUeXBlZCBzdWJ0aXRsZSAqL1xyXG5cdCQoJy50eXBlZC10aXRsZScpLnR5cGVkKHtcclxuXHRcdHN0cmluZ3NFbGVtZW50OiAkKCcudHlwaW5nLXRpdGxlJyksXHJcblx0XHRiYWNrRGVsYXk6IDUwMDAsIC8qIERlbGF5IGluIHRleHQgY2hhbmdlICovXHJcblx0XHR0eXBlU3BlZWQ6IDIwLCAvKiBUeXBpbmcgc3BlZWQgKi9cclxuXHRcdGxvb3A6IHRydWVcclxuXHR9KTtcclxuXHJcblx0Ly8gLyogWW91dHViZSB2aWRlbyBiYWNrZ3JvdW5kICovXHJcblx0Ly8gdmFyIG15UGxheWVyID0gJChcIiN2aWRlby1iZ1wiKS5ZVFBsYXllcigpO1xyXG5cclxuXHJcblxyXG5cclxuXHRjb25zdCBvcGVuU2lkZU5hdiA9ICgpID0+IHtcclxuXHRcdGlmKCQoJy50b3AtbWVudScpLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdCQoJy50b3AtbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcudG9wLW1lbnUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qIE9wZW4gVG9wIE1lbnUgKi9cclxuXHQkKCcucGFnZScpLm9uKCdjbGljaycsICcubWVudS1idG4nLCBvcGVuU2lkZU5hdik7XHJcblx0JCgnLmNsb3NlJykub24oJ2NsaWNrJywgb3BlblNpZGVOYXYpO1xyXG5cdC8qIEhpZGUgbW91c2UgYnV0dG9uIG9uIHNjcm9sbCAqL1xyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSBoZWlnaHQtMTApIHtcclxuXHRcdFx0JCgnLm1vdXNlLWJ0bicpLmZhZGVPdXQoKTtcclxuXHRcdH1cclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcubW91c2UtYnRuJykuZmFkZUluKCk7XHJcblx0XHR9XHJcblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8PSBoZWlnaHQtMTApIHtcclxuXHRcdFx0JCgnLnRvcC1tZW51IHVsIGxpJykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIC8qIFBhdXNlL1BsYXkgdmlkZW8gb24gc2Nyb2xsICovXHJcblx0Ly8gaWYgKCQoJyN2aWRlby1iZycpLmxlbmd0aCkge1xyXG5cdC8vIFx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHQvLyBcdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gaGVpZ2h0LTEwKSB7XHJcblx0Ly8gXHRcdFx0JCgnI3ZpZGVvLWJnJykuWVRQUGF1c2UoKTtcclxuXHQvLyBcdFx0fVxyXG5cdC8vIFx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8PSBoZWlnaHQtMTApIHtcclxuXHQvLyBcdFx0XHQkKCcjdmlkZW8tYmcnKS5ZVFBQbGF5KCk7XHJcblx0Ly8gXHRcdH1cclxuXHQvLyBcdH0pO1xyXG5cdC8vIH1cclxuXHJcblx0LyogT24gY2xpY2sgbW91c2UgYnV0dG9uLCBwYWdlIHNjcm9sbCBkb3duICovXHJcblx0JCgnLnNlY3Rpb24nKS5vbignY2xpY2snLCAnLm1vdXNlLWJ0bicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcblx0XHRcdHNjcm9sbFRvcDogaGVpZ2h0XHJcblx0XHR9LCA4MDApO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBNZW51IGZpbGxlZCAqL1xyXG5cdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDEwMCkge1xyXG5cdFx0JCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcblx0fVxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAxMDApIHtcclxuXHRcdFx0JCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBJbml0aWFsaXplIG1hc29ucnkgaXRlbXMgKi9cclxuXHR2YXIgJGNvbnRhaW5lciA9ICQoJy5ib3gtaXRlbXMnKTtcclxuXHJcblx0JGNvbnRhaW5lci5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKSB7XHJcblx0XHQkY29udGFpbmVyLm11bHRpcGxlRmlsdGVyTWFzb25yeSh7XHJcblx0XHRcdGl0ZW1TZWxlY3RvcjogJy5ib3gtaXRlbScsXHJcblx0XHRcdGZpbHRlcnNHcm91cFNlbGVjdG9yOiAnLmZpbHRlcnMnLFxyXG5cdFx0XHRwZXJjZW50UG9zaXRpb246IHRydWUsXHJcblx0XHRcdGd1dHRlcjogMFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKiAxMi4gSW5pdGlhbGl6ZSBtYXNvbnJ5IGZpbHRlciAqL1xyXG5cdCQoJy5maWx0ZXJzIGxhYmVsJykub24oJ2NoYW5nZScsICdpbnB1dFt0eXBlPVwicmFkaW9cIl0nLCBmdW5jdGlvbigpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKCdydW5uaW5nJyk7XHJcblx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHQkKCcuZl9idG4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykuY2xvc2VzdCgnLmZfYnRuJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdFx0LyogUmVmcmVzaCBQb3J0Zm9saW8gbWFnbmlmaWMgcG9wdXAgKi9cclxuXHRcdCQoJy5oYXMtcG9wdXAnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdFx0dHlwZTogJ2lubGluZScsXHJcblx0XHRcdG92ZXJmbG93WTogJ2F1dG8nLFxyXG5cdFx0XHRjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuXHRcdFx0bWFpbkNsYXNzOiAnbWZwLWZhZGUnLFxyXG5cdFx0XHRjYWxsYmFja3M6IHtcclxuXHRcdCAgICBvcGVuOiBmdW5jdGlvbigpIHtcclxuXHRcdCAgICAgIGNvbnNvbGUubG9nKCd3YWtlIHVwIHNlcnZlciBmKHgpJyk7XHJcblx0XHRcdFx0XHRpZiAoIWRldk1vZGUpIHdha2VVcChzZXJ2ZXJVUkxzW3RoaXMuY3Vyckl0ZW0uc3JjXSk7XHJcblx0XHQgICAgfVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyogUG9ydGZvbGlvIG1hZ25pZmljIHBvcHVwICovXHJcblx0JCgnLmhhcy1wb3B1cCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0dHlwZTogJ2lubGluZScsXHJcblx0XHRvdmVyZmxvd1k6ICdhdXRvJyxcclxuXHRcdGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG5cdFx0bWFpbkNsYXNzOiAnbWZwLWZhZGUnLFxyXG5cdFx0Y2FsbGJhY2tzOiB7XHJcblx0ICAgIG9wZW46IGZ1bmN0aW9uKCkge1xyXG5cdCAgICAgIGNvbnNvbGUubG9nKCd3YWtlIHVwIHNlcnZlciBmKHgpJyk7XHJcblx0XHRcdFx0aWYgKCFkZXZNb2RlKSB3YWtlVXAoc2VydmVyVVJMc1t0aGlzLmN1cnJJdGVtLnNyY10pO1xyXG5cdCAgICB9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIGdhbGxlcnkgKi9cclxuXHQkKCcucG9zdC1saWdodGJveCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0ZGVsZWdhdGU6ICdhJyxcclxuXHRcdHR5cGU6ICdpbWFnZScsXHJcblx0XHR0TG9hZGluZzogJ0xvYWRpbmcgaW1hZ2UgIyVjdXJyJS4uLicsXHJcblx0XHRtYWluQ2xhc3M6ICdtZnAtaW1nLW1vYmlsZScsXHJcblx0XHRnYWxsZXJ5OiB7XHJcblx0XHRcdGVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdG5hdmlnYXRlQnlJbWdDbGljazogdHJ1ZSxcclxuXHRcdFx0cHJlbG9hZDogWzAsMV0gLy8gV2lsbCBwcmVsb2FkIDAgLSBiZWZvcmUgY3VycmVudCwgYW5kIDEgYWZ0ZXIgdGhlIGN1cnJlbnQgaW1hZ2VcclxuXHRcdH0sXHJcblx0XHRpbWFnZToge1xyXG5cdFx0XHR0RXJyb3I6ICc8YSBocmVmPVwiJXVybCVcIj5UaGUgaW1hZ2UgIyVjdXJyJTwvYT4gY291bGQgbm90IGJlIGxvYWRlZC4nXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIFZhbGlkYXRlIGNvbnRhY3QgZm9ybSAqL1xyXG5cdCQoXCIjY2Zvcm1cIikudmFsaWRhdGUoe1xyXG5cdFx0cnVsZXM6IHtcclxuXHRcdFx0bmFtZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdHRlbDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdG1lc3NhZ2U6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWJqZWN0OiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0ZW1haWw6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcclxuXHRcdFx0XHRlbWFpbDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogXCJ2YWxpZFwiLFxyXG5cdFx0c3VibWl0SGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnbWFpbGVyL2ZlZWRiYWNrLnBocCcsXHJcblx0XHRcdFx0dHlwZTogJ3Bvc3QnLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXHJcblx0XHRcdFx0ZGF0YTogJ25hbWU9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpLnZhbCgpICsgJyZ0ZWw9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwidGVsXCJdJykudmFsKCkgKyAnJmVtYWlsPScrICQoXCIjY2Zvcm1cIikuZmluZCgnaW5wdXRbbmFtZT1cImVtYWlsXCJdJykudmFsKCkgKyAnJnN1YmplY3Q9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwic3ViamVjdFwiXScpLnZhbCgpICsgJyZtZXNzYWdlPScgKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ3RleHRhcmVhW25hbWU9XCJtZXNzYWdlXCJdJykudmFsKCksXHJcblx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdCQoJyNjZm9ybScpLmZhZGVPdXQoKTtcclxuXHRcdFx0XHRcdCQoJy5hbGVydC1zdWNjZXNzJykuZGVsYXkoMTAwMCkuZmFkZUluKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogVmFsaWRhdGUgY29udGFjdCBmb3JtICovXHJcblx0JChcIiNibG9nLWZvcm1cIikudmFsaWRhdGUoe1xyXG5cdFx0cnVsZXM6IHtcclxuXHRcdFx0bmFtZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdG1lc3NhZ2U6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbWFpbDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxyXG5cdFx0XHRcdGVtYWlsOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBcInZhbGlkXCIsXHJcblx0XHRzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnI2Jsb2ctZm9ybScpLmZhZGVPdXQoKTtcclxuXHRcdFx0JCgnLmFsZXJ0LXN1Y2Nlc3MnKS5kZWxheSgxMDAwKS5mYWRlSW4oKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Y29uc3Qgc2VydmVyVVJMcyA9IHtcclxuXHRcdFwiI2JvcHpcIjogJ2h0dHBzOi8vYnVzaW5lc3Mtb3B6Lmhlcm9rdWFwcC5jb20vJyxcclxuXHRcdFwiI2RvdHRpXCI6ICdodHRwczovL2RvdHRpLWFnZW5jeS5oZXJva3VhcHAuY29tLycsXHJcblx0XHRcIiN4Y1wiOiAnaHR0cHM6Ly94Y3Vyc2lvbi5oZXJva3VhcHAuY29tLycsXHJcblx0XHRcIiN0b29saWVcIjogJ2h0dHBzOi8vdG9vbGllYm94Lmhlcm9rdWFwcC5jb20vJyxcclxuXHRcdFwiI3NhaWxvcnNcIjogJ2h0dHBzOi8vdGc5NzAuZ2l0aHViLmlvL3RnLmNvbS8nLFxyXG5cdFx0XCIjdGltZVwiOiAnaHR0cHM6Ly90aW1lc2hlZXRzLWlvLmhlcm9rdWFwcC5jb20vJ1xyXG5cdH1cclxuXHJcblx0Ly93YWtlIHVwIHByb2plY3Qgc2VydmVyc1xyXG5cdGNvbnN0IHdha2VVcCA9ICh1cmwpID0+IHtcclxuXHRcdGNvbnNvbGUubG9nKCd3YWtlIHVwIHJ1bm5pbmcnLCB1cmwpO1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiB1cmwsXHJcblx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2pxIGFqYXggY2FsbCBzdWNjZXNzJyk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKHhocikge1xyXG5cdCAgICAgIGNvbnNvbGUubG9nKCdhamF4IGVycm9yJyk7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyh4aHIpO1xyXG5cdCAgICB9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQvL3dha2VVcCgnaHR0cHM6Ly9kcnlob2xsb3cuaGVyb2t1YXBwLmNvbS8nKTtcclxuXHJcbn0pO1xyXG4iXX0=
