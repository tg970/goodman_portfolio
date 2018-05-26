/**
*	Hendrix (HTML)
*	Copyright © Hendrix by beshleyua. All Rights Reserved.
**/

$(function () {
	'use strict';

	var width = $(window).width();
	var height = $(window).height();
	$('.section.started').css({'height':height});

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
		backDelay: 5000, /* Delay in text change */
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
		      console.log('magnificPopup open call back');
					wakeUp(serverURLs[this.currItem.src]);
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
	      console.log('magnificPopup open call back');
				wakeUp(serverURLs[this.currItem.src]);
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
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuKlx0SGVuZHJpeCAoSFRNTClcclxuKlx0Q29weXJpZ2h0IMKpIEhlbmRyaXggYnkgYmVzaGxleXVhLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4qKi9cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0dmFyIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcblx0dmFyIGhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHQkKCcuc2VjdGlvbi5zdGFydGVkJykuY3NzKHsnaGVpZ2h0JzpoZWlnaHR9KTtcclxuXHJcblx0LyogUHJlbG9hZGVyICovXHJcblx0JCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKFwiLnByZWxvYWRlciAuc3Bpbm5lclwiKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygncmVhZHknKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBUeXBlZCBzdWJ0aXRsZSAqL1xyXG5cdCQoJy50eXBlZC10aXRsZScpLnR5cGVkKHtcclxuXHRcdHN0cmluZ3NFbGVtZW50OiAkKCcudHlwaW5nLXRpdGxlJyksXHJcblx0XHRiYWNrRGVsYXk6IDUwMDAsIC8qIERlbGF5IGluIHRleHQgY2hhbmdlICovXHJcblx0XHR0eXBlU3BlZWQ6IDIwLCAvKiBUeXBpbmcgc3BlZWQgKi9cclxuXHRcdGxvb3A6IHRydWVcclxuXHR9KTtcclxuXHJcblx0Ly8gLyogWW91dHViZSB2aWRlbyBiYWNrZ3JvdW5kICovXHJcblx0Ly8gdmFyIG15UGxheWVyID0gJChcIiN2aWRlby1iZ1wiKS5ZVFBsYXllcigpO1xyXG5cclxuXHQvKiBTbW9vdGhzY3JvbGwgKi9cclxuXHRpZigkKCcuc2VjdGlvbi5zdGFydGVkJykubGVuZ3RoKSB7XHJcblx0XHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBzY3JvbGxQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAxNTA7XHJcblx0XHRcdC8vY29uc29sZS5sb2coc2Nyb2xsUG9zKTtcclxuXHRcdFx0JCgnLnRvcC1tZW51IHVsIGxpIGEnKVxyXG5cdFx0XHQuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJMaW5rID0gJCh0aGlzKTtcclxuXHRcdFx0XHR2YXIgcmVmRWxlbWVudCA9ICQoY3VyckxpbmsuYXR0cihcImhyZWZcIikpO1xyXG5cdFx0XHRcdHZhciBvZmZzZXQgPSByZWZFbGVtZW50Lm9mZnNldCgpLnRvcFxyXG5cdFx0XHRcdGlmICggb2Zmc2V0IDw9IHNjcm9sbFBvcykge1xyXG5cdFx0XHRcdFx0JCgnLnRvcC1tZW51IHVsIGxpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhjdXJyTGluay5wYXJlbnQoKSk7XHJcblx0XHRcdFx0XHRjdXJyTGluay5wYXJlbnQoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKiBUb3AgTWVudSAqL1xyXG5cdGlmKCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5sZW5ndGgpIHtcclxuXHRcdGxldCBtZW51ID0gJCgnLnRvcC1tZW51IHVsIGxpIGEnKVxyXG5cdFx0bWVudS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRvcGVuU2lkZU5hdigpO1xyXG5cdFx0XHR2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0dmFyIGggPSBwYXJzZUZsb2F0KCQoaWQpLm9mZnNldCgpLnRvcCk7XHJcblxyXG5cdFx0XHQkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuXHRcdFx0XHRzY3JvbGxUb3A6IGggLSA2NVxyXG5cdFx0XHR9LCA4MDApO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IG9wZW5TaWRlTmF2ID0gKCkgPT4ge1xyXG5cdFx0aWYoJCgnLnRvcC1tZW51JykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdFx0JCgnLnRvcC1tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy50b3AtbWVudScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyogT3BlbiBUb3AgTWVudSAqL1xyXG5cdCQoJy5wYWdlJykub24oJ2NsaWNrJywgJy5tZW51LWJ0bicsIG9wZW5TaWRlTmF2KTtcclxuXHQkKCcuY2xvc2UnKS5vbignY2xpY2snLCBvcGVuU2lkZU5hdik7XHJcblx0LyogSGlkZSBtb3VzZSBidXR0b24gb24gc2Nyb2xsICovXHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcubW91c2UtYnRuJykuZmFkZU91dCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPD0gaGVpZ2h0LTEwKSB7XHJcblx0XHRcdCQoJy5tb3VzZS1idG4nKS5mYWRlSW4oKTtcclxuXHRcdH1cclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcudG9wLW1lbnUgdWwgbGknKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gLyogUGF1c2UvUGxheSB2aWRlbyBvbiBzY3JvbGwgKi9cclxuXHQvLyBpZiAoJCgnI3ZpZGVvLWJnJykubGVuZ3RoKSB7XHJcblx0Ly8gXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdC8vIFx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSBoZWlnaHQtMTApIHtcclxuXHQvLyBcdFx0XHQkKCcjdmlkZW8tYmcnKS5ZVFBQYXVzZSgpO1xyXG5cdC8vIFx0XHR9XHJcblx0Ly8gXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdC8vIFx0XHRcdCQoJyN2aWRlby1iZycpLllUUFBsYXkoKTtcclxuXHQvLyBcdFx0fVxyXG5cdC8vIFx0fSk7XHJcblx0Ly8gfVxyXG5cclxuXHQvKiBPbiBjbGljayBtb3VzZSBidXR0b24sIHBhZ2Ugc2Nyb2xsIGRvd24gKi9cclxuXHQkKCcuc2VjdGlvbicpLm9uKCdjbGljaycsICcubW91c2UtYnRuJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuXHRcdFx0c2Nyb2xsVG9wOiBoZWlnaHRcclxuXHRcdH0sIDgwMCk7XHJcblx0fSk7XHJcblxyXG5cdC8qIE1lbnUgZmlsbGVkICovXHJcblx0aWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMTAwKSB7XHJcblx0XHQkKCdoZWFkZXInKS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuXHR9XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDEwMCkge1xyXG5cdFx0XHQkKCdoZWFkZXInKS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIEluaXRpYWxpemUgbWFzb25yeSBpdGVtcyAqL1xyXG5cdHZhciAkY29udGFpbmVyID0gJCgnLmJveC1pdGVtcycpO1xyXG5cclxuXHQkY29udGFpbmVyLmltYWdlc0xvYWRlZChmdW5jdGlvbigpIHtcclxuXHRcdCRjb250YWluZXIubXVsdGlwbGVGaWx0ZXJNYXNvbnJ5KHtcclxuXHRcdFx0aXRlbVNlbGVjdG9yOiAnLmJveC1pdGVtJyxcclxuXHRcdFx0ZmlsdGVyc0dyb3VwU2VsZWN0b3I6ICcuZmlsdGVycycsXHJcblx0XHRcdHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcclxuXHRcdFx0Z3V0dGVyOiAwXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8qIDEyLiBJbml0aWFsaXplIG1hc29ucnkgZmlsdGVyICovXHJcblx0JCgnLmZpbHRlcnMgbGFiZWwnKS5vbignY2hhbmdlJywgJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coJ3J1bm5pbmcnKTtcclxuXHRcdGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdCQoJy5mX2J0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuZl9idG4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0XHQvKiBSZWZyZXNoIFBvcnRmb2xpbyBtYWduaWZpYyBwb3B1cCAqL1xyXG5cdFx0JCgnLmhhcy1wb3B1cCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0XHR0eXBlOiAnaW5saW5lJyxcclxuXHRcdFx0b3ZlcmZsb3dZOiAnYXV0bycsXHJcblx0XHRcdGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG5cdFx0XHRtYWluQ2xhc3M6ICdtZnAtZmFkZScsXHJcblx0XHRcdGNhbGxiYWNrczoge1xyXG5cdFx0ICAgIG9wZW46IGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgICAgY29uc29sZS5sb2coJ21hZ25pZmljUG9wdXAgb3BlbiBjYWxsIGJhY2snKTtcclxuXHRcdFx0XHRcdHdha2VVcChzZXJ2ZXJVUkxzW3RoaXMuY3Vyckl0ZW0uc3JjXSk7XHJcblx0XHQgICAgfVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyogUG9ydGZvbGlvIG1hZ25pZmljIHBvcHVwICovXHJcblx0JCgnLmhhcy1wb3B1cCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0dHlwZTogJ2lubGluZScsXHJcblx0XHRvdmVyZmxvd1k6ICdhdXRvJyxcclxuXHRcdGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG5cdFx0bWFpbkNsYXNzOiAnbWZwLWZhZGUnLFxyXG5cdFx0Y2FsbGJhY2tzOiB7XHJcblx0ICAgIG9wZW46IGZ1bmN0aW9uKCkge1xyXG5cdCAgICAgIGNvbnNvbGUubG9nKCdtYWduaWZpY1BvcHVwIG9wZW4gY2FsbCBiYWNrJyk7XHJcblx0XHRcdFx0d2FrZVVwKHNlcnZlclVSTHNbdGhpcy5jdXJySXRlbS5zcmNdKTtcclxuXHQgICAgfVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBnYWxsZXJ5ICovXHJcblx0JCgnLnBvc3QtbGlnaHRib3gnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdGRlbGVnYXRlOiAnYScsXHJcblx0XHR0eXBlOiAnaW1hZ2UnLFxyXG5cdFx0dExvYWRpbmc6ICdMb2FkaW5nIGltYWdlICMlY3VyciUuLi4nLFxyXG5cdFx0bWFpbkNsYXNzOiAnbWZwLWltZy1tb2JpbGUnLFxyXG5cdFx0Z2FsbGVyeToge1xyXG5cdFx0XHRlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRuYXZpZ2F0ZUJ5SW1nQ2xpY2s6IHRydWUsXHJcblx0XHRcdHByZWxvYWQ6IFswLDFdIC8vIFdpbGwgcHJlbG9hZCAwIC0gYmVmb3JlIGN1cnJlbnQsIGFuZCAxIGFmdGVyIHRoZSBjdXJyZW50IGltYWdlXHJcblx0XHR9LFxyXG5cdFx0aW1hZ2U6IHtcclxuXHRcdFx0dEVycm9yOiAnPGEgaHJlZj1cIiV1cmwlXCI+VGhlIGltYWdlICMlY3VyciU8L2E+IGNvdWxkIG5vdCBiZSBsb2FkZWQuJ1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBWYWxpZGF0ZSBjb250YWN0IGZvcm0gKi9cclxuXHQkKFwiI2Nmb3JtXCIpLnZhbGlkYXRlKHtcclxuXHRcdHJ1bGVzOiB7XHJcblx0XHRcdG5hbWU6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0ZWw6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtZXNzYWdlOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0c3ViamVjdDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdGVtYWlsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXHJcblx0XHRcdFx0ZW1haWw6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IFwidmFsaWRcIixcclxuXHRcdHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHVybDogJ21haWxlci9mZWVkYmFjay5waHAnLFxyXG5cdFx0XHRcdHR5cGU6ICdwb3N0JyxcclxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cdFx0XHRcdGRhdGE6ICduYW1lPScrICQoXCIjY2Zvcm1cIikuZmluZCgnaW5wdXRbbmFtZT1cIm5hbWVcIl0nKS52YWwoKSArICcmdGVsPScrICQoXCIjY2Zvcm1cIikuZmluZCgnaW5wdXRbbmFtZT1cInRlbFwiXScpLnZhbCgpICsgJyZlbWFpbD0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJlbWFpbFwiXScpLnZhbCgpICsgJyZzdWJqZWN0PScrICQoXCIjY2Zvcm1cIikuZmluZCgnaW5wdXRbbmFtZT1cInN1YmplY3RcIl0nKS52YWwoKSArICcmbWVzc2FnZT0nICsgJChcIiNjZm9ybVwiKS5maW5kKCd0ZXh0YXJlYVtuYW1lPVwibWVzc2FnZVwiXScpLnZhbCgpLFxyXG5cdFx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0XHQkKCcjY2Zvcm0nKS5mYWRlT3V0KCk7XHJcblx0XHRcdFx0XHQkKCcuYWxlcnQtc3VjY2VzcycpLmRlbGF5KDEwMDApLmZhZGVJbigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIFZhbGlkYXRlIGNvbnRhY3QgZm9ybSAqL1xyXG5cdCQoXCIjYmxvZy1mb3JtXCIpLnZhbGlkYXRlKHtcclxuXHRcdHJ1bGVzOiB7XHJcblx0XHRcdG5hbWU6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtZXNzYWdlOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0ZW1haWw6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcclxuXHRcdFx0XHRlbWFpbDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogXCJ2YWxpZFwiLFxyXG5cdFx0c3VibWl0SGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJyNibG9nLWZvcm0nKS5mYWRlT3V0KCk7XHJcblx0XHRcdCQoJy5hbGVydC1zdWNjZXNzJykuZGVsYXkoMTAwMCkuZmFkZUluKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGNvbnN0IHNlcnZlclVSTHMgPSB7XHJcblx0XHRcIiNib3B6XCI6ICdodHRwczovL2J1c2luZXNzLW9wei5oZXJva3VhcHAuY29tLycsXHJcblx0XHRcIiNkb3R0aVwiOiAnaHR0cHM6Ly9kb3R0aS1hZ2VuY3kuaGVyb2t1YXBwLmNvbS8nLFxyXG5cdFx0XCIjeGNcIjogJ2h0dHBzOi8veGN1cnNpb24uaGVyb2t1YXBwLmNvbS8nLFxyXG5cdFx0XCIjdG9vbGllXCI6ICdodHRwczovL3Rvb2xpZWJveC5oZXJva3VhcHAuY29tLycsXHJcblx0XHRcIiNzYWlsb3JzXCI6ICdodHRwczovL3RnOTcwLmdpdGh1Yi5pby90Zy5jb20vJyxcclxuXHRcdFwiI3RpbWVcIjogJ2h0dHBzOi8vdGltZXNoZWV0cy1pby5oZXJva3VhcHAuY29tLydcclxuXHR9XHJcblxyXG5cdC8vd2FrZSB1cCBwcm9qZWN0IHNlcnZlcnNcclxuXHRjb25zdCB3YWtlVXAgPSAodXJsKSA9PiB7XHJcblx0XHRjb25zb2xlLmxvZygnd2FrZSB1cCBydW5uaW5nJywgdXJsKTtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogdXJsLFxyXG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJ1xyXG4gICAgICB9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdqcSBhamF4IGNhbGwgc3VjY2VzcycpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbih4aHIpIHtcclxuXHQgICAgICBjb25zb2xlLmxvZygnYWpheCBlcnJvcicpO1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coeGhyKTtcclxuXHQgICAgfVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Ly93YWtlVXAoJ2h0dHBzOi8vZHJ5aG9sbG93Lmhlcm9rdWFwcC5jb20vJyk7XHJcblxyXG59KTtcclxuIl19
