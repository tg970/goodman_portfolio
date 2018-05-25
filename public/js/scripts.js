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
		typeSpeed: 0, /* Typing speed */
		loop: true
	});

	// /* Youtube video background */
	// var myPlayer = $("#video-bg").YTPlayer();

	/* Smoothscroll */
	if($('.section.started').length) {
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.offset().top <= scrollPos) {
					$('.top-menu ul li').removeClass("active");
					currLink.closest('li').addClass("active");
				}
			});
		});
	}

	/* Top Menu */
	if($('.section.started').length) {
		$('.top-menu ul li a').on('click', function(){
			openSideNav();
			var id = $(this).attr('href');
			var h = parseFloat($(id).offset().top);

			$('body,html').animate({
				scrollTop: h + 10
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4qXHRIZW5kcml4IChIVE1MKVxyXG4qXHRDb3B5cmlnaHQgwqkgSGVuZHJpeCBieSBiZXNobGV5dWEuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbioqL1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHR2YXIgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHR2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cdCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5jc3MoeydoZWlnaHQnOmhlaWdodH0pO1xyXG5cclxuXHQvKiBQcmVsb2FkZXIgKi9cclxuXHQkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdCQoXCIucHJlbG9hZGVyIC5zcGlubmVyXCIpLmZhZGVPdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdyZWFkeScpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qIFR5cGVkIHN1YnRpdGxlICovXHJcblx0JCgnLnR5cGVkLXRpdGxlJykudHlwZWQoe1xyXG5cdFx0c3RyaW5nc0VsZW1lbnQ6ICQoJy50eXBpbmctdGl0bGUnKSxcclxuXHRcdGJhY2tEZWxheTogNTAwMCwgLyogRGVsYXkgaW4gdGV4dCBjaGFuZ2UgKi9cclxuXHRcdHR5cGVTcGVlZDogMCwgLyogVHlwaW5nIHNwZWVkICovXHJcblx0XHRsb29wOiB0cnVlXHJcblx0fSk7XHJcblxyXG5cdC8vIC8qIFlvdXR1YmUgdmlkZW8gYmFja2dyb3VuZCAqL1xyXG5cdC8vIHZhciBteVBsYXllciA9ICQoXCIjdmlkZW8tYmdcIikuWVRQbGF5ZXIoKTtcclxuXHJcblx0LyogU21vb3Roc2Nyb2xsICovXHJcblx0aWYoJCgnLnNlY3Rpb24uc3RhcnRlZCcpLmxlbmd0aCkge1xyXG5cdFx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgc2Nyb2xsUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cdFx0XHQkKCcudG9wLW1lbnUgdWwgbGkgYScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBjdXJyTGluayA9ICQodGhpcyk7XHJcblx0XHRcdFx0dmFyIHJlZkVsZW1lbnQgPSAkKGN1cnJMaW5rLmF0dHIoXCJocmVmXCIpKTtcclxuXHRcdFx0XHRpZiAocmVmRWxlbWVudC5vZmZzZXQoKS50b3AgPD0gc2Nyb2xsUG9zKSB7XHJcblx0XHRcdFx0XHQkKCcudG9wLW1lbnUgdWwgbGknKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRcdGN1cnJMaW5rLmNsb3Nlc3QoJ2xpJykuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyogVG9wIE1lbnUgKi9cclxuXHRpZigkKCcuc2VjdGlvbi5zdGFydGVkJykubGVuZ3RoKSB7XHJcblx0XHQkKCcudG9wLW1lbnUgdWwgbGkgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdG9wZW5TaWRlTmF2KCk7XHJcblx0XHRcdHZhciBpZCA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cdFx0XHR2YXIgaCA9IHBhcnNlRmxvYXQoJChpZCkub2Zmc2V0KCkudG9wKTtcclxuXHJcblx0XHRcdCQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdHNjcm9sbFRvcDogaCArIDEwXHJcblx0XHRcdH0sIDgwMCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IG9wZW5TaWRlTmF2ID0gKCkgPT4ge1xyXG5cdFx0aWYoJCgnLnRvcC1tZW51JykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdFx0JCgnLnRvcC1tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy50b3AtbWVudScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyogT3BlbiBUb3AgTWVudSAqL1xyXG5cdCQoJy5wYWdlJykub24oJ2NsaWNrJywgJy5tZW51LWJ0bicsIG9wZW5TaWRlTmF2KTtcclxuXHJcblx0LyogSGlkZSBtb3VzZSBidXR0b24gb24gc2Nyb2xsICovXHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcubW91c2UtYnRuJykuZmFkZU91dCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPD0gaGVpZ2h0LTEwKSB7XHJcblx0XHRcdCQoJy5tb3VzZS1idG4nKS5mYWRlSW4oKTtcclxuXHRcdH1cclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcudG9wLW1lbnUgdWwgbGknKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gLyogUGF1c2UvUGxheSB2aWRlbyBvbiBzY3JvbGwgKi9cclxuXHQvLyBpZiAoJCgnI3ZpZGVvLWJnJykubGVuZ3RoKSB7XHJcblx0Ly8gXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdC8vIFx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSBoZWlnaHQtMTApIHtcclxuXHQvLyBcdFx0XHQkKCcjdmlkZW8tYmcnKS5ZVFBQYXVzZSgpO1xyXG5cdC8vIFx0XHR9XHJcblx0Ly8gXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdC8vIFx0XHRcdCQoJyN2aWRlby1iZycpLllUUFBsYXkoKTtcclxuXHQvLyBcdFx0fVxyXG5cdC8vIFx0fSk7XHJcblx0Ly8gfVxyXG5cclxuXHQvKiBPbiBjbGljayBtb3VzZSBidXR0b24sIHBhZ2Ugc2Nyb2xsIGRvd24gKi9cclxuXHQkKCcuc2VjdGlvbicpLm9uKCdjbGljaycsICcubW91c2UtYnRuJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuXHRcdFx0c2Nyb2xsVG9wOiBoZWlnaHRcclxuXHRcdH0sIDgwMCk7XHJcblx0fSk7XHJcblxyXG5cdC8qIE1lbnUgZmlsbGVkICovXHJcblx0aWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMTAwKSB7XHJcblx0XHQkKCdoZWFkZXInKS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuXHR9XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDEwMCkge1xyXG5cdFx0XHQkKCdoZWFkZXInKS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIEluaXRpYWxpemUgbWFzb25yeSBpdGVtcyAqL1xyXG5cdHZhciAkY29udGFpbmVyID0gJCgnLmJveC1pdGVtcycpO1xyXG5cclxuXHQkY29udGFpbmVyLmltYWdlc0xvYWRlZChmdW5jdGlvbigpIHtcclxuXHRcdCRjb250YWluZXIubXVsdGlwbGVGaWx0ZXJNYXNvbnJ5KHtcclxuXHRcdFx0aXRlbVNlbGVjdG9yOiAnLmJveC1pdGVtJyxcclxuXHRcdFx0ZmlsdGVyc0dyb3VwU2VsZWN0b3I6ICcuZmlsdGVycycsXHJcblx0XHRcdHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcclxuXHRcdFx0Z3V0dGVyOiAwXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8qIDEyLiBJbml0aWFsaXplIG1hc29ucnkgZmlsdGVyICovXHJcblx0JCgnLmZpbHRlcnMgbGFiZWwnKS5vbignY2hhbmdlJywgJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0JCgnLmZfYnRuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5mX2J0bicpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHRcdC8qIFJlZnJlc2ggUG9ydGZvbGlvIG1hZ25pZmljIHBvcHVwICovXHJcblx0XHQkKCcuaGFzLXBvcHVwJykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHRcdHR5cGU6ICdpbmxpbmUnLFxyXG5cdFx0XHRvdmVyZmxvd1k6ICdhdXRvJyxcclxuXHRcdFx0Y2xvc2VCdG5JbnNpZGU6IHRydWUsXHJcblx0XHRcdG1haW5DbGFzczogJ21mcC1mYWRlJ1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qIFBvcnRmb2xpbyBtYWduaWZpYyBwb3B1cCAqL1xyXG5cdCQoJy5oYXMtcG9wdXAnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdHR5cGU6ICdpbmxpbmUnLFxyXG5cdFx0b3ZlcmZsb3dZOiAnYXV0bycsXHJcblx0XHRjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuXHRcdG1haW5DbGFzczogJ21mcC1mYWRlJ1xyXG5cdH0pO1xyXG5cclxuXHQvKiBnYWxsZXJ5ICovXHJcblx0JCgnLnBvc3QtbGlnaHRib3gnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdGRlbGVnYXRlOiAnYScsXHJcblx0XHR0eXBlOiAnaW1hZ2UnLFxyXG5cdFx0dExvYWRpbmc6ICdMb2FkaW5nIGltYWdlICMlY3VyciUuLi4nLFxyXG5cdFx0bWFpbkNsYXNzOiAnbWZwLWltZy1tb2JpbGUnLFxyXG5cdFx0Z2FsbGVyeToge1xyXG5cdFx0XHRlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRuYXZpZ2F0ZUJ5SW1nQ2xpY2s6IHRydWUsXHJcblx0XHRcdHByZWxvYWQ6IFswLDFdIC8vIFdpbGwgcHJlbG9hZCAwIC0gYmVmb3JlIGN1cnJlbnQsIGFuZCAxIGFmdGVyIHRoZSBjdXJyZW50IGltYWdlXHJcblx0XHR9LFxyXG5cdFx0aW1hZ2U6IHtcclxuXHRcdFx0dEVycm9yOiAnPGEgaHJlZj1cIiV1cmwlXCI+VGhlIGltYWdlICMlY3VyciU8L2E+IGNvdWxkIG5vdCBiZSBsb2FkZWQuJ1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBWYWxpZGF0ZSBjb250YWN0IGZvcm0gKi9cclxuXHQkKFwiI2Nmb3JtXCIpLnZhbGlkYXRlKHtcclxuXHRcdHJ1bGVzOiB7XHJcblx0XHRcdG5hbWU6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0ZWw6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtZXNzYWdlOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0c3ViamVjdDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdGVtYWlsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXHJcblx0XHRcdFx0ZW1haWw6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IFwidmFsaWRcIixcclxuXHRcdHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHVybDogJ21haWxlci9mZWVkYmFjay5waHAnLFxyXG5cdFx0XHRcdHR5cGU6ICdwb3N0JyxcclxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cdFx0XHRcdGRhdGE6ICduYW1lPScrICQoXCIjY2Zvcm1cIikuZmluZCgnaW5wdXRbbmFtZT1cIm5hbWVcIl0nKS52YWwoKSArICcmdGVsPScrICQoXCIjY2Zvcm1cIikuZmluZCgnaW5wdXRbbmFtZT1cInRlbFwiXScpLnZhbCgpICsgJyZlbWFpbD0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJlbWFpbFwiXScpLnZhbCgpICsgJyZzdWJqZWN0PScrICQoXCIjY2Zvcm1cIikuZmluZCgnaW5wdXRbbmFtZT1cInN1YmplY3RcIl0nKS52YWwoKSArICcmbWVzc2FnZT0nICsgJChcIiNjZm9ybVwiKS5maW5kKCd0ZXh0YXJlYVtuYW1lPVwibWVzc2FnZVwiXScpLnZhbCgpLFxyXG5cdFx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0XHQkKCcjY2Zvcm0nKS5mYWRlT3V0KCk7XHJcblx0XHRcdFx0XHQkKCcuYWxlcnQtc3VjY2VzcycpLmRlbGF5KDEwMDApLmZhZGVJbigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIFZhbGlkYXRlIGNvbnRhY3QgZm9ybSAqL1xyXG5cdCQoXCIjYmxvZy1mb3JtXCIpLnZhbGlkYXRlKHtcclxuXHRcdHJ1bGVzOiB7XHJcblx0XHRcdG5hbWU6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtZXNzYWdlOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0ZW1haWw6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcclxuXHRcdFx0XHRlbWFpbDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogXCJ2YWxpZFwiLFxyXG5cdFx0c3VibWl0SGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJyNibG9nLWZvcm0nKS5mYWRlT3V0KCk7XHJcblx0XHRcdCQoJy5hbGVydC1zdWNjZXNzJykuZGVsYXkoMTAwMCkuZmFkZUluKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG59KTtcclxuIl19
