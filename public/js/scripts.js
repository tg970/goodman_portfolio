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

	/* Youtube video background */
	var myPlayer = $("#video-bg").YTPlayer();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuKlx0SGVuZHJpeCAoSFRNTClcclxuKlx0Q29weXJpZ2h0IMKpIEhlbmRyaXggYnkgYmVzaGxleXVhLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4qKi9cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHR2YXIgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHR2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cdCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5jc3MoeydoZWlnaHQnOmhlaWdodH0pO1xyXG5cdFxyXG5cdC8qIFByZWxvYWRlciAqL1xyXG5cdCQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0JChcIi5wcmVsb2FkZXIgLnNwaW5uZXJcIikuZmFkZU91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ3JlYWR5Jyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyogVHlwZWQgc3VidGl0bGUgKi9cclxuXHQkKCcudHlwZWQtdGl0bGUnKS50eXBlZCh7XHJcblx0XHRzdHJpbmdzRWxlbWVudDogJCgnLnR5cGluZy10aXRsZScpLFxyXG5cdFx0YmFja0RlbGF5OiA1MDAwLCAvKiBEZWxheSBpbiB0ZXh0IGNoYW5nZSAqL1xyXG5cdFx0dHlwZVNwZWVkOiAwLCAvKiBUeXBpbmcgc3BlZWQgKi9cclxuXHRcdGxvb3A6IHRydWVcclxuXHR9KTtcclxuXHJcblx0LyogWW91dHViZSB2aWRlbyBiYWNrZ3JvdW5kICovXHJcblx0dmFyIG15UGxheWVyID0gJChcIiN2aWRlby1iZ1wiKS5ZVFBsYXllcigpO1xyXG5cclxuXHQvKiBTbW9vdGhzY3JvbGwgKi9cclxuXHRpZigkKCcuc2VjdGlvbi5zdGFydGVkJykubGVuZ3RoKSB7XHJcblx0XHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBzY3JvbGxQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblx0XHRcdCQoJy50b3AtbWVudSB1bCBsaSBhJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJMaW5rID0gJCh0aGlzKTtcclxuXHRcdFx0XHR2YXIgcmVmRWxlbWVudCA9ICQoY3VyckxpbmsuYXR0cihcImhyZWZcIikpO1xyXG5cdFx0XHRcdGlmIChyZWZFbGVtZW50Lm9mZnNldCgpLnRvcCA8PSBzY3JvbGxQb3MpIHtcclxuXHRcdFx0XHRcdCQoJy50b3AtbWVudSB1bCBsaScpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdFx0Y3VyckxpbmsuY2xvc2VzdCgnbGknKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKiBUb3AgTWVudSAqL1xyXG5cdGlmKCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5sZW5ndGgpIHtcclxuXHRcdCQoJy50b3AtbWVudSB1bCBsaSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGlkID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblx0XHRcdHZhciBoID0gcGFyc2VGbG9hdCgkKGlkKS5vZmZzZXQoKS50b3ApO1xyXG5cdFx0XHRcclxuXHRcdFx0JCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcblx0XHRcdFx0c2Nyb2xsVG9wOiBoICsgMTBcclxuXHRcdFx0fSwgODAwKTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyogT3BlbiBUb3AgTWVudSAqL1xyXG5cdCQoJy5wYWdlJykub24oJ2NsaWNrJywgJy5tZW51LWJ0bicsIGZ1bmN0aW9uKCl7XHJcblx0XHRpZigkKCcudG9wLW1lbnUnKS5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG5cdFx0XHQkKCcudG9wLW1lbnUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnLnRvcC1tZW51JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblx0XHJcblx0LyogSGlkZSBtb3VzZSBidXR0b24gb24gc2Nyb2xsICovXHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcubW91c2UtYnRuJykuZmFkZU91dCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPD0gaGVpZ2h0LTEwKSB7XHJcblx0XHRcdCQoJy5tb3VzZS1idG4nKS5mYWRlSW4oKTtcclxuXHRcdH1cclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcudG9wLW1lbnUgdWwgbGknKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogUGF1c2UvUGxheSB2aWRlbyBvbiBzY3JvbGwgKi9cclxuXHRpZiAoJCgnI3ZpZGVvLWJnJykubGVuZ3RoKSB7XHJcblx0XHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSBoZWlnaHQtMTApIHtcclxuXHRcdFx0XHQkKCcjdmlkZW8tYmcnKS5ZVFBQYXVzZSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdFx0XHRcdCQoJyN2aWRlby1iZycpLllUUFBsYXkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qIE9uIGNsaWNrIG1vdXNlIGJ1dHRvbiwgcGFnZSBzY3JvbGwgZG93biAqL1xyXG5cdCQoJy5zZWN0aW9uJykub24oJ2NsaWNrJywgJy5tb3VzZS1idG4nLCBmdW5jdGlvbigpIHtcclxuXHRcdCQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG5cdFx0XHRzY3JvbGxUb3A6IGhlaWdodFxyXG5cdFx0fSwgODAwKTtcclxuXHR9KTtcclxuXHJcblx0LyogTWVudSBmaWxsZWQgKi9cclxuXHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAxMDApIHtcclxuXHRcdCQoJ2hlYWRlcicpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdH1cclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMTAwKSB7XHJcblx0XHRcdCQoJ2hlYWRlcicpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogSW5pdGlhbGl6ZSBtYXNvbnJ5IGl0ZW1zICovXHJcblx0dmFyICRjb250YWluZXIgPSAkKCcuYm94LWl0ZW1zJyk7XHJcblx0XHJcblx0JGNvbnRhaW5lci5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKSB7XHJcblx0XHQkY29udGFpbmVyLm11bHRpcGxlRmlsdGVyTWFzb25yeSh7XHJcblx0XHRcdGl0ZW1TZWxlY3RvcjogJy5ib3gtaXRlbScsXHJcblx0XHRcdGZpbHRlcnNHcm91cFNlbGVjdG9yOiAnLmZpbHRlcnMnLFxyXG5cdFx0XHRwZXJjZW50UG9zaXRpb246IHRydWUsXHJcblx0XHRcdGd1dHRlcjogMFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblx0XHJcblxyXG5cdC8qIDEyLiBJbml0aWFsaXplIG1hc29ucnkgZmlsdGVyICovXHJcblx0JCgnLmZpbHRlcnMgbGFiZWwnKS5vbignY2hhbmdlJywgJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0JCgnLmZfYnRuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5mX2J0bicpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHRcdC8qIFJlZnJlc2ggUG9ydGZvbGlvIG1hZ25pZmljIHBvcHVwICovXHJcblx0XHQkKCcuaGFzLXBvcHVwJykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHRcdHR5cGU6ICdpbmxpbmUnLFxyXG5cdFx0XHRvdmVyZmxvd1k6ICdhdXRvJyxcclxuXHRcdFx0Y2xvc2VCdG5JbnNpZGU6IHRydWUsXHJcblx0XHRcdG1haW5DbGFzczogJ21mcC1mYWRlJ1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qIFBvcnRmb2xpbyBtYWduaWZpYyBwb3B1cCAqL1xyXG5cdCQoJy5oYXMtcG9wdXAnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdHR5cGU6ICdpbmxpbmUnLFxyXG5cdFx0b3ZlcmZsb3dZOiAnYXV0bycsXHJcblx0XHRjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuXHRcdG1haW5DbGFzczogJ21mcC1mYWRlJ1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qIGdhbGxlcnkgKi9cclxuXHQkKCcucG9zdC1saWdodGJveCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0ZGVsZWdhdGU6ICdhJyxcclxuXHRcdHR5cGU6ICdpbWFnZScsXHJcblx0XHR0TG9hZGluZzogJ0xvYWRpbmcgaW1hZ2UgIyVjdXJyJS4uLicsXHJcblx0XHRtYWluQ2xhc3M6ICdtZnAtaW1nLW1vYmlsZScsXHJcblx0XHRnYWxsZXJ5OiB7XHJcblx0XHRcdGVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdG5hdmlnYXRlQnlJbWdDbGljazogdHJ1ZSxcclxuXHRcdFx0cHJlbG9hZDogWzAsMV0gLy8gV2lsbCBwcmVsb2FkIDAgLSBiZWZvcmUgY3VycmVudCwgYW5kIDEgYWZ0ZXIgdGhlIGN1cnJlbnQgaW1hZ2VcclxuXHRcdH0sXHJcblx0XHRpbWFnZToge1xyXG5cdFx0XHR0RXJyb3I6ICc8YSBocmVmPVwiJXVybCVcIj5UaGUgaW1hZ2UgIyVjdXJyJTwvYT4gY291bGQgbm90IGJlIGxvYWRlZC4nXHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHJcblx0LyogVmFsaWRhdGUgY29udGFjdCBmb3JtICovXHJcblx0JChcIiNjZm9ybVwiKS52YWxpZGF0ZSh7XHJcblx0XHRydWxlczoge1xyXG5cdFx0XHRuYW1lOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0dGVsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0bWVzc2FnZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1YmplY3Q6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbWFpbDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxyXG5cdFx0XHRcdGVtYWlsOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBcInZhbGlkXCIsXHJcblx0XHRzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR1cmw6ICdtYWlsZXIvZmVlZGJhY2sucGhwJyxcclxuXHRcdFx0XHR0eXBlOiAncG9zdCcsXHJcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcclxuXHRcdFx0XHRkYXRhOiAnbmFtZT0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJuYW1lXCJdJykudmFsKCkgKyAnJnRlbD0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJ0ZWxcIl0nKS52YWwoKSArICcmZW1haWw9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwiZW1haWxcIl0nKS52YWwoKSArICcmc3ViamVjdD0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJzdWJqZWN0XCJdJykudmFsKCkgKyAnJm1lc3NhZ2U9JyArICQoXCIjY2Zvcm1cIikuZmluZCgndGV4dGFyZWFbbmFtZT1cIm1lc3NhZ2VcIl0nKS52YWwoKSxcclxuXHRcdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdCQoJyNjZm9ybScpLmZhZGVPdXQoKTtcclxuXHRcdFx0XHRcdCQoJy5hbGVydC1zdWNjZXNzJykuZGVsYXkoMTAwMCkuZmFkZUluKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRcclxuXHQvKiBWYWxpZGF0ZSBjb250YWN0IGZvcm0gKi9cclxuXHQkKFwiI2Jsb2ctZm9ybVwiKS52YWxpZGF0ZSh7XHJcblx0XHRydWxlczoge1xyXG5cdFx0XHRuYW1lOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0bWVzc2FnZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdGVtYWlsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXHJcblx0XHRcdFx0ZW1haWw6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IFwidmFsaWRcIixcclxuXHRcdHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjYmxvZy1mb3JtJykuZmFkZU91dCgpO1xyXG5cdFx0XHQkKCcuYWxlcnQtc3VjY2VzcycpLmRlbGF5KDEwMDApLmZhZGVJbigpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxufSk7Il19
