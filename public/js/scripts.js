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
			mainClass: 'mfp-fade'
		});
	});

	/* Portfolio magnific popup */
	$('.has-popup').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade'
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

});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuKlx0SGVuZHJpeCAoSFRNTClcclxuKlx0Q29weXJpZ2h0IMKpIEhlbmRyaXggYnkgYmVzaGxleXVhLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4qKi9cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0dmFyIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcblx0dmFyIGhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHQkKCcuc2VjdGlvbi5zdGFydGVkJykuY3NzKHsnaGVpZ2h0JzpoZWlnaHR9KTtcclxuXHJcblx0LyogUHJlbG9hZGVyICovXHJcblx0JCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKFwiLnByZWxvYWRlciAuc3Bpbm5lclwiKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygncmVhZHknKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBUeXBlZCBzdWJ0aXRsZSAqL1xyXG5cdCQoJy50eXBlZC10aXRsZScpLnR5cGVkKHtcclxuXHRcdHN0cmluZ3NFbGVtZW50OiAkKCcudHlwaW5nLXRpdGxlJyksXHJcblx0XHRiYWNrRGVsYXk6IDUwMDAsIC8qIERlbGF5IGluIHRleHQgY2hhbmdlICovXHJcblx0XHR0eXBlU3BlZWQ6IDIwLCAvKiBUeXBpbmcgc3BlZWQgKi9cclxuXHRcdGxvb3A6IHRydWVcclxuXHR9KTtcclxuXHJcblx0Ly8gLyogWW91dHViZSB2aWRlbyBiYWNrZ3JvdW5kICovXHJcblx0Ly8gdmFyIG15UGxheWVyID0gJChcIiN2aWRlby1iZ1wiKS5ZVFBsYXllcigpO1xyXG5cclxuXHQvKiBTbW9vdGhzY3JvbGwgKi9cclxuXHRpZigkKCcuc2VjdGlvbi5zdGFydGVkJykubGVuZ3RoKSB7XHJcblx0XHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBzY3JvbGxQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAxNTA7XHJcblx0XHRcdC8vY29uc29sZS5sb2coc2Nyb2xsUG9zKTtcclxuXHRcdFx0JCgnLnRvcC1tZW51IHVsIGxpIGEnKVxyXG5cdFx0XHQuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJMaW5rID0gJCh0aGlzKTtcclxuXHRcdFx0XHR2YXIgcmVmRWxlbWVudCA9ICQoY3VyckxpbmsuYXR0cihcImhyZWZcIikpO1xyXG5cdFx0XHRcdHZhciBvZmZzZXQgPSByZWZFbGVtZW50Lm9mZnNldCgpLnRvcFxyXG5cdFx0XHRcdGlmICggb2Zmc2V0IDw9IHNjcm9sbFBvcykge1xyXG5cdFx0XHRcdFx0JCgnLnRvcC1tZW51IHVsIGxpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhjdXJyTGluay5wYXJlbnQoKSk7XHJcblx0XHRcdFx0XHRjdXJyTGluay5wYXJlbnQoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKiBUb3AgTWVudSAqL1xyXG5cdGlmKCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5sZW5ndGgpIHtcclxuXHRcdGxldCBtZW51ID0gJCgnLnRvcC1tZW51IHVsIGxpIGEnKVxyXG5cdFx0bWVudS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRvcGVuU2lkZU5hdigpO1xyXG5cdFx0XHR2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0dmFyIGggPSBwYXJzZUZsb2F0KCQoaWQpLm9mZnNldCgpLnRvcCk7XHJcblxyXG5cdFx0XHQkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuXHRcdFx0XHRzY3JvbGxUb3A6IGggLSA2NVxyXG5cdFx0XHR9LCA4MDApO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IG9wZW5TaWRlTmF2ID0gKCkgPT4ge1xyXG5cdFx0aWYoJCgnLnRvcC1tZW51JykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdFx0JCgnLnRvcC1tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy50b3AtbWVudScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyogT3BlbiBUb3AgTWVudSAqL1xyXG5cdCQoJy5wYWdlJykub24oJ2NsaWNrJywgJy5tZW51LWJ0bicsIG9wZW5TaWRlTmF2KTtcclxuXHQkKCcuY2xvc2UnKS5vbignY2xpY2snLCBvcGVuU2lkZU5hdik7XHJcblx0LyogSGlkZSBtb3VzZSBidXR0b24gb24gc2Nyb2xsICovXHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcubW91c2UtYnRuJykuZmFkZU91dCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPD0gaGVpZ2h0LTEwKSB7XHJcblx0XHRcdCQoJy5tb3VzZS1idG4nKS5mYWRlSW4oKTtcclxuXHRcdH1cclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcudG9wLW1lbnUgdWwgbGknKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gLyogUGF1c2UvUGxheSB2aWRlbyBvbiBzY3JvbGwgKi9cclxuXHQvLyBpZiAoJCgnI3ZpZGVvLWJnJykubGVuZ3RoKSB7XHJcblx0Ly8gXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdC8vIFx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSBoZWlnaHQtMTApIHtcclxuXHQvLyBcdFx0XHQkKCcjdmlkZW8tYmcnKS5ZVFBQYXVzZSgpO1xyXG5cdC8vIFx0XHR9XHJcblx0Ly8gXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdC8vIFx0XHRcdCQoJyN2aWRlby1iZycpLllUUFBsYXkoKTtcclxuXHQvLyBcdFx0fVxyXG5cdC8vIFx0fSk7XHJcblx0Ly8gfVxyXG5cclxuXHQvKiBPbiBjbGljayBtb3VzZSBidXR0b24sIHBhZ2Ugc2Nyb2xsIGRvd24gKi9cclxuXHQkKCcuc2VjdGlvbicpLm9uKCdjbGljaycsICcubW91c2UtYnRuJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuXHRcdFx0c2Nyb2xsVG9wOiBoZWlnaHRcclxuXHRcdH0sIDgwMCk7XHJcblx0fSk7XHJcblxyXG5cdC8qIE1lbnUgZmlsbGVkICovXHJcblx0aWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMTAwKSB7XHJcblx0XHQkKCdoZWFkZXInKS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuXHR9XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDEwMCkge1xyXG5cdFx0XHQkKCdoZWFkZXInKS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIEluaXRpYWxpemUgbWFzb25yeSBpdGVtcyAqL1xyXG5cdHZhciAkY29udGFpbmVyID0gJCgnLmJveC1pdGVtcycpO1xyXG5cclxuXHQkY29udGFpbmVyLmltYWdlc0xvYWRlZChmdW5jdGlvbigpIHtcclxuXHRcdCRjb250YWluZXIubXVsdGlwbGVGaWx0ZXJNYXNvbnJ5KHtcclxuXHRcdFx0aXRlbVNlbGVjdG9yOiAnLmJveC1pdGVtJyxcclxuXHRcdFx0ZmlsdGVyc0dyb3VwU2VsZWN0b3I6ICcuZmlsdGVycycsXHJcblx0XHRcdHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcclxuXHRcdFx0Z3V0dGVyOiAwXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8qIDEyLiBJbml0aWFsaXplIG1hc29ucnkgZmlsdGVyICovXHJcblx0JCgnLmZpbHRlcnMgbGFiZWwnKS5vbignY2hhbmdlJywgJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coJ3J1bm5pbmcnKTtcclxuXHRcdGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdCQoJy5mX2J0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuZl9idG4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0XHQvKiBSZWZyZXNoIFBvcnRmb2xpbyBtYWduaWZpYyBwb3B1cCAqL1xyXG5cdFx0JCgnLmhhcy1wb3B1cCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0XHR0eXBlOiAnaW5saW5lJyxcclxuXHRcdFx0b3ZlcmZsb3dZOiAnYXV0bycsXHJcblx0XHRcdGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG5cdFx0XHRtYWluQ2xhc3M6ICdtZnAtZmFkZSdcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBQb3J0Zm9saW8gbWFnbmlmaWMgcG9wdXAgKi9cclxuXHQkKCcuaGFzLXBvcHVwJykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHR0eXBlOiAnaW5saW5lJyxcclxuXHRcdG92ZXJmbG93WTogJ2F1dG8nLFxyXG5cdFx0Y2xvc2VCdG5JbnNpZGU6IHRydWUsXHJcblx0XHRtYWluQ2xhc3M6ICdtZnAtZmFkZSdcclxuXHR9KTtcclxuXHJcblx0LyogZ2FsbGVyeSAqL1xyXG5cdCQoJy5wb3N0LWxpZ2h0Ym94JykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHRkZWxlZ2F0ZTogJ2EnLFxyXG5cdFx0dHlwZTogJ2ltYWdlJyxcclxuXHRcdHRMb2FkaW5nOiAnTG9hZGluZyBpbWFnZSAjJWN1cnIlLi4uJyxcclxuXHRcdG1haW5DbGFzczogJ21mcC1pbWctbW9iaWxlJyxcclxuXHRcdGdhbGxlcnk6IHtcclxuXHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0bmF2aWdhdGVCeUltZ0NsaWNrOiB0cnVlLFxyXG5cdFx0XHRwcmVsb2FkOiBbMCwxXSAvLyBXaWxsIHByZWxvYWQgMCAtIGJlZm9yZSBjdXJyZW50LCBhbmQgMSBhZnRlciB0aGUgY3VycmVudCBpbWFnZVxyXG5cdFx0fSxcclxuXHRcdGltYWdlOiB7XHJcblx0XHRcdHRFcnJvcjogJzxhIGhyZWY9XCIldXJsJVwiPlRoZSBpbWFnZSAjJWN1cnIlPC9hPiBjb3VsZCBub3QgYmUgbG9hZGVkLidcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogVmFsaWRhdGUgY29udGFjdCBmb3JtICovXHJcblx0JChcIiNjZm9ybVwiKS52YWxpZGF0ZSh7XHJcblx0XHRydWxlczoge1xyXG5cdFx0XHRuYW1lOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0dGVsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0bWVzc2FnZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1YmplY3Q6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbWFpbDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxyXG5cdFx0XHRcdGVtYWlsOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBcInZhbGlkXCIsXHJcblx0XHRzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR1cmw6ICdtYWlsZXIvZmVlZGJhY2sucGhwJyxcclxuXHRcdFx0XHR0eXBlOiAncG9zdCcsXHJcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcclxuXHRcdFx0XHRkYXRhOiAnbmFtZT0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJuYW1lXCJdJykudmFsKCkgKyAnJnRlbD0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJ0ZWxcIl0nKS52YWwoKSArICcmZW1haWw9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwiZW1haWxcIl0nKS52YWwoKSArICcmc3ViamVjdD0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJzdWJqZWN0XCJdJykudmFsKCkgKyAnJm1lc3NhZ2U9JyArICQoXCIjY2Zvcm1cIikuZmluZCgndGV4dGFyZWFbbmFtZT1cIm1lc3NhZ2VcIl0nKS52YWwoKSxcclxuXHRcdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0JCgnI2Nmb3JtJykuZmFkZU91dCgpO1xyXG5cdFx0XHRcdFx0JCgnLmFsZXJ0LXN1Y2Nlc3MnKS5kZWxheSgxMDAwKS5mYWRlSW4oKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBWYWxpZGF0ZSBjb250YWN0IGZvcm0gKi9cclxuXHQkKFwiI2Jsb2ctZm9ybVwiKS52YWxpZGF0ZSh7XHJcblx0XHRydWxlczoge1xyXG5cdFx0XHRuYW1lOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0bWVzc2FnZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdGVtYWlsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXHJcblx0XHRcdFx0ZW1haWw6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IFwidmFsaWRcIixcclxuXHRcdHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjYmxvZy1mb3JtJykuZmFkZU91dCgpO1xyXG5cdFx0XHQkKCcuYWxlcnQtc3VjY2VzcycpLmRlbGF5KDEwMDApLmZhZGVJbigpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxufSk7XHJcbiJdfQ==
