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
			var id = $(this).attr('href');
			var h = parseFloat($(id).offset().top);

			$('body,html').animate({
				scrollTop: h + 10
			}, 800);

			return false;
		});
	}

	/* Open Top Menu */
	$('.page').on('click', '.menu-btn', function(){
		if($('.top-menu').hasClass('active')){
			$('.top-menu').removeClass('active');
			$(this).removeClass('active');
		} else {
			$('.top-menu').addClass('active');
			$(this).addClass('active');
		}

		return false;
	});

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

	/* Pause/Play video on scroll */
	if ($('#video-bg').length) {
		$(window).on('scroll', function() {
			if ($(this).scrollTop() >= height-10) {
				$('#video-bg').YTPPause();
			}
			if ($(this).scrollTop() <= height-10) {
				$('#video-bg').YTPPlay();
			}
		});
	}

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4qXHRIZW5kcml4IChIVE1MKVxyXG4qXHRDb3B5cmlnaHQgwqkgSGVuZHJpeCBieSBiZXNobGV5dWEuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbioqL1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHR2YXIgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHR2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cdCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5jc3MoeydoZWlnaHQnOmhlaWdodH0pO1xyXG5cclxuXHQvKiBQcmVsb2FkZXIgKi9cclxuXHQkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdCQoXCIucHJlbG9hZGVyIC5zcGlubmVyXCIpLmZhZGVPdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdyZWFkeScpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qIFR5cGVkIHN1YnRpdGxlICovXHJcblx0JCgnLnR5cGVkLXRpdGxlJykudHlwZWQoe1xyXG5cdFx0c3RyaW5nc0VsZW1lbnQ6ICQoJy50eXBpbmctdGl0bGUnKSxcclxuXHRcdGJhY2tEZWxheTogNTAwMCwgLyogRGVsYXkgaW4gdGV4dCBjaGFuZ2UgKi9cclxuXHRcdHR5cGVTcGVlZDogMCwgLyogVHlwaW5nIHNwZWVkICovXHJcblx0XHRsb29wOiB0cnVlXHJcblx0fSk7XHJcblxyXG5cdC8vIC8qIFlvdXR1YmUgdmlkZW8gYmFja2dyb3VuZCAqL1xyXG5cdC8vIHZhciBteVBsYXllciA9ICQoXCIjdmlkZW8tYmdcIikuWVRQbGF5ZXIoKTtcclxuXHJcblx0LyogU21vb3Roc2Nyb2xsICovXHJcblx0aWYoJCgnLnNlY3Rpb24uc3RhcnRlZCcpLmxlbmd0aCkge1xyXG5cdFx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgc2Nyb2xsUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cdFx0XHQkKCcudG9wLW1lbnUgdWwgbGkgYScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBjdXJyTGluayA9ICQodGhpcyk7XHJcblx0XHRcdFx0dmFyIHJlZkVsZW1lbnQgPSAkKGN1cnJMaW5rLmF0dHIoXCJocmVmXCIpKTtcclxuXHRcdFx0XHRpZiAocmVmRWxlbWVudC5vZmZzZXQoKS50b3AgPD0gc2Nyb2xsUG9zKSB7XHJcblx0XHRcdFx0XHQkKCcudG9wLW1lbnUgdWwgbGknKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRcdGN1cnJMaW5rLmNsb3Nlc3QoJ2xpJykuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyogVG9wIE1lbnUgKi9cclxuXHRpZigkKCcuc2VjdGlvbi5zdGFydGVkJykubGVuZ3RoKSB7XHJcblx0XHQkKCcudG9wLW1lbnUgdWwgbGkgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpZCA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cdFx0XHR2YXIgaCA9IHBhcnNlRmxvYXQoJChpZCkub2Zmc2V0KCkudG9wKTtcclxuXHJcblx0XHRcdCQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdHNjcm9sbFRvcDogaCArIDEwXHJcblx0XHRcdH0sIDgwMCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qIE9wZW4gVG9wIE1lbnUgKi9cclxuXHQkKCcucGFnZScpLm9uKCdjbGljaycsICcubWVudS1idG4nLCBmdW5jdGlvbigpe1xyXG5cdFx0aWYoJCgnLnRvcC1tZW51JykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdFx0JCgnLnRvcC1tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy50b3AtbWVudScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBIaWRlIG1vdXNlIGJ1dHRvbiBvbiBzY3JvbGwgKi9cclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gaGVpZ2h0LTEwKSB7XHJcblx0XHRcdCQoJy5tb3VzZS1idG4nKS5mYWRlT3V0KCk7XHJcblx0XHR9XHJcblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8PSBoZWlnaHQtMTApIHtcclxuXHRcdFx0JCgnLm1vdXNlLWJ0bicpLmZhZGVJbigpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPD0gaGVpZ2h0LTEwKSB7XHJcblx0XHRcdCQoJy50b3AtbWVudSB1bCBsaScpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBQYXVzZS9QbGF5IHZpZGVvIG9uIHNjcm9sbCAqL1xyXG5cdGlmICgkKCcjdmlkZW8tYmcnKS5sZW5ndGgpIHtcclxuXHRcdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IGhlaWdodC0xMCkge1xyXG5cdFx0XHRcdCQoJyN2aWRlby1iZycpLllUUFBhdXNlKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPD0gaGVpZ2h0LTEwKSB7XHJcblx0XHRcdFx0JCgnI3ZpZGVvLWJnJykuWVRQUGxheSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qIE9uIGNsaWNrIG1vdXNlIGJ1dHRvbiwgcGFnZSBzY3JvbGwgZG93biAqL1xyXG5cdCQoJy5zZWN0aW9uJykub24oJ2NsaWNrJywgJy5tb3VzZS1idG4nLCBmdW5jdGlvbigpIHtcclxuXHRcdCQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG5cdFx0XHRzY3JvbGxUb3A6IGhlaWdodFxyXG5cdFx0fSwgODAwKTtcclxuXHR9KTtcclxuXHJcblx0LyogTWVudSBmaWxsZWQgKi9cclxuXHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAxMDApIHtcclxuXHRcdCQoJ2hlYWRlcicpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdH1cclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMTAwKSB7XHJcblx0XHRcdCQoJ2hlYWRlcicpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogSW5pdGlhbGl6ZSBtYXNvbnJ5IGl0ZW1zICovXHJcblx0dmFyICRjb250YWluZXIgPSAkKCcuYm94LWl0ZW1zJyk7XHJcblxyXG5cdCRjb250YWluZXIuaW1hZ2VzTG9hZGVkKGZ1bmN0aW9uKCkge1xyXG5cdFx0JGNvbnRhaW5lci5tdWx0aXBsZUZpbHRlck1hc29ucnkoe1xyXG5cdFx0XHRpdGVtU2VsZWN0b3I6ICcuYm94LWl0ZW0nLFxyXG5cdFx0XHRmaWx0ZXJzR3JvdXBTZWxlY3RvcjogJy5maWx0ZXJzJyxcclxuXHRcdFx0cGVyY2VudFBvc2l0aW9uOiB0cnVlLFxyXG5cdFx0XHRndXR0ZXI6IDBcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyogMTIuIEluaXRpYWxpemUgbWFzb25yeSBmaWx0ZXIgKi9cclxuXHQkKCcuZmlsdGVycyBsYWJlbCcpLm9uKCdjaGFuZ2UnLCAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHQkKCcuZl9idG4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykuY2xvc2VzdCgnLmZfYnRuJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdFx0LyogUmVmcmVzaCBQb3J0Zm9saW8gbWFnbmlmaWMgcG9wdXAgKi9cclxuXHRcdCQoJy5oYXMtcG9wdXAnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdFx0dHlwZTogJ2lubGluZScsXHJcblx0XHRcdG92ZXJmbG93WTogJ2F1dG8nLFxyXG5cdFx0XHRjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuXHRcdFx0bWFpbkNsYXNzOiAnbWZwLWZhZGUnXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyogUG9ydGZvbGlvIG1hZ25pZmljIHBvcHVwICovXHJcblx0JCgnLmhhcy1wb3B1cCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0dHlwZTogJ2lubGluZScsXHJcblx0XHRvdmVyZmxvd1k6ICdhdXRvJyxcclxuXHRcdGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG5cdFx0bWFpbkNsYXNzOiAnbWZwLWZhZGUnXHJcblx0fSk7XHJcblxyXG5cdC8qIGdhbGxlcnkgKi9cclxuXHQkKCcucG9zdC1saWdodGJveCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0ZGVsZWdhdGU6ICdhJyxcclxuXHRcdHR5cGU6ICdpbWFnZScsXHJcblx0XHR0TG9hZGluZzogJ0xvYWRpbmcgaW1hZ2UgIyVjdXJyJS4uLicsXHJcblx0XHRtYWluQ2xhc3M6ICdtZnAtaW1nLW1vYmlsZScsXHJcblx0XHRnYWxsZXJ5OiB7XHJcblx0XHRcdGVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdG5hdmlnYXRlQnlJbWdDbGljazogdHJ1ZSxcclxuXHRcdFx0cHJlbG9hZDogWzAsMV0gLy8gV2lsbCBwcmVsb2FkIDAgLSBiZWZvcmUgY3VycmVudCwgYW5kIDEgYWZ0ZXIgdGhlIGN1cnJlbnQgaW1hZ2VcclxuXHRcdH0sXHJcblx0XHRpbWFnZToge1xyXG5cdFx0XHR0RXJyb3I6ICc8YSBocmVmPVwiJXVybCVcIj5UaGUgaW1hZ2UgIyVjdXJyJTwvYT4gY291bGQgbm90IGJlIGxvYWRlZC4nXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qIFZhbGlkYXRlIGNvbnRhY3QgZm9ybSAqL1xyXG5cdCQoXCIjY2Zvcm1cIikudmFsaWRhdGUoe1xyXG5cdFx0cnVsZXM6IHtcclxuXHRcdFx0bmFtZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdHRlbDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdG1lc3NhZ2U6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWJqZWN0OiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0ZW1haWw6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcclxuXHRcdFx0XHRlbWFpbDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogXCJ2YWxpZFwiLFxyXG5cdFx0c3VibWl0SGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnbWFpbGVyL2ZlZWRiYWNrLnBocCcsXHJcblx0XHRcdFx0dHlwZTogJ3Bvc3QnLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXHJcblx0XHRcdFx0ZGF0YTogJ25hbWU9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpLnZhbCgpICsgJyZ0ZWw9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwidGVsXCJdJykudmFsKCkgKyAnJmVtYWlsPScrICQoXCIjY2Zvcm1cIikuZmluZCgnaW5wdXRbbmFtZT1cImVtYWlsXCJdJykudmFsKCkgKyAnJnN1YmplY3Q9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwic3ViamVjdFwiXScpLnZhbCgpICsgJyZtZXNzYWdlPScgKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ3RleHRhcmVhW25hbWU9XCJtZXNzYWdlXCJdJykudmFsKCksXHJcblx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdCQoJyNjZm9ybScpLmZhZGVPdXQoKTtcclxuXHRcdFx0XHRcdCQoJy5hbGVydC1zdWNjZXNzJykuZGVsYXkoMTAwMCkuZmFkZUluKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogVmFsaWRhdGUgY29udGFjdCBmb3JtICovXHJcblx0JChcIiNibG9nLWZvcm1cIikudmFsaWRhdGUoe1xyXG5cdFx0cnVsZXM6IHtcclxuXHRcdFx0bmFtZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdG1lc3NhZ2U6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbWFpbDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxyXG5cdFx0XHRcdGVtYWlsOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBcInZhbGlkXCIsXHJcblx0XHRzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnI2Jsb2ctZm9ybScpLmZhZGVPdXQoKTtcclxuXHRcdFx0JCgnLmFsZXJ0LXN1Y2Nlc3MnKS5kZWxheSgxMDAwKS5mYWRlSW4oKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcbn0pO1xyXG4iXX0=
