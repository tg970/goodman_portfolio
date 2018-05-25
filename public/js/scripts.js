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
				//console.log('=>',refElement.offset().top);
				if (refElement.offset().top <= scrollPos) {
					$('.top-menu ul li').removeClass("active");
					currLink.closest('li').addClass("active");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4qXHRIZW5kcml4IChIVE1MKVxyXG4qXHRDb3B5cmlnaHQgwqkgSGVuZHJpeCBieSBiZXNobGV5dWEuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbioqL1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHR2YXIgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHR2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cdCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5jc3MoeydoZWlnaHQnOmhlaWdodH0pO1xyXG5cclxuXHQvKiBQcmVsb2FkZXIgKi9cclxuXHQkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdCQoXCIucHJlbG9hZGVyIC5zcGlubmVyXCIpLmZhZGVPdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdyZWFkeScpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qIFR5cGVkIHN1YnRpdGxlICovXHJcblx0JCgnLnR5cGVkLXRpdGxlJykudHlwZWQoe1xyXG5cdFx0c3RyaW5nc0VsZW1lbnQ6ICQoJy50eXBpbmctdGl0bGUnKSxcclxuXHRcdGJhY2tEZWxheTogNTAwMCwgLyogRGVsYXkgaW4gdGV4dCBjaGFuZ2UgKi9cclxuXHRcdHR5cGVTcGVlZDogMjAsIC8qIFR5cGluZyBzcGVlZCAqL1xyXG5cdFx0bG9vcDogdHJ1ZVxyXG5cdH0pO1xyXG5cclxuXHQvLyAvKiBZb3V0dWJlIHZpZGVvIGJhY2tncm91bmQgKi9cclxuXHQvLyB2YXIgbXlQbGF5ZXIgPSAkKFwiI3ZpZGVvLWJnXCIpLllUUGxheWVyKCk7XHJcblxyXG5cdC8qIFNtb290aHNjcm9sbCAqL1xyXG5cdGlmKCQoJy5zZWN0aW9uLnN0YXJ0ZWQnKS5sZW5ndGgpIHtcclxuXHRcdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHNjcm9sbFBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArIDE1MDtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhzY3JvbGxQb3MpO1xyXG5cdFx0XHQkKCcudG9wLW1lbnUgdWwgbGkgYScpXHJcblx0XHRcdC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR2YXIgY3VyckxpbmsgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdHZhciByZWZFbGVtZW50ID0gJChjdXJyTGluay5hdHRyKFwiaHJlZlwiKSk7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnPT4nLHJlZkVsZW1lbnQub2Zmc2V0KCkudG9wKTtcclxuXHRcdFx0XHRpZiAocmVmRWxlbWVudC5vZmZzZXQoKS50b3AgPD0gc2Nyb2xsUG9zKSB7XHJcblx0XHRcdFx0XHQkKCcudG9wLW1lbnUgdWwgbGknKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRcdGN1cnJMaW5rLmNsb3Nlc3QoJ2xpJykuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyogVG9wIE1lbnUgKi9cclxuXHRpZigkKCcuc2VjdGlvbi5zdGFydGVkJykubGVuZ3RoKSB7XHJcblx0XHRsZXQgbWVudSA9ICQoJy50b3AtbWVudSB1bCBsaSBhJylcclxuXHRcdG1lbnUub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0b3BlblNpZGVOYXYoKTtcclxuXHRcdFx0dmFyIGlkID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblx0XHRcdHZhciBoID0gcGFyc2VGbG9hdCgkKGlkKS5vZmZzZXQoKS50b3ApO1xyXG5cclxuXHRcdFx0JCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcblx0XHRcdFx0c2Nyb2xsVG9wOiBoIC0gNjVcclxuXHRcdFx0fSwgODAwKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjb25zdCBvcGVuU2lkZU5hdiA9ICgpID0+IHtcclxuXHRcdGlmKCQoJy50b3AtbWVudScpLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdCQoJy50b3AtbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcudG9wLW1lbnUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qIE9wZW4gVG9wIE1lbnUgKi9cclxuXHQkKCcucGFnZScpLm9uKCdjbGljaycsICcubWVudS1idG4nLCBvcGVuU2lkZU5hdik7XHJcblx0JCgnLmNsb3NlJykub24oJ2NsaWNrJywgb3BlblNpZGVOYXYpO1xyXG5cdC8qIEhpZGUgbW91c2UgYnV0dG9uIG9uIHNjcm9sbCAqL1xyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSBoZWlnaHQtMTApIHtcclxuXHRcdFx0JCgnLm1vdXNlLWJ0bicpLmZhZGVPdXQoKTtcclxuXHRcdH1cclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDw9IGhlaWdodC0xMCkge1xyXG5cdFx0XHQkKCcubW91c2UtYnRuJykuZmFkZUluKCk7XHJcblx0XHR9XHJcblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8PSBoZWlnaHQtMTApIHtcclxuXHRcdFx0JCgnLnRvcC1tZW51IHVsIGxpJykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIC8qIFBhdXNlL1BsYXkgdmlkZW8gb24gc2Nyb2xsICovXHJcblx0Ly8gaWYgKCQoJyN2aWRlby1iZycpLmxlbmd0aCkge1xyXG5cdC8vIFx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHQvLyBcdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gaGVpZ2h0LTEwKSB7XHJcblx0Ly8gXHRcdFx0JCgnI3ZpZGVvLWJnJykuWVRQUGF1c2UoKTtcclxuXHQvLyBcdFx0fVxyXG5cdC8vIFx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8PSBoZWlnaHQtMTApIHtcclxuXHQvLyBcdFx0XHQkKCcjdmlkZW8tYmcnKS5ZVFBQbGF5KCk7XHJcblx0Ly8gXHRcdH1cclxuXHQvLyBcdH0pO1xyXG5cdC8vIH1cclxuXHJcblx0LyogT24gY2xpY2sgbW91c2UgYnV0dG9uLCBwYWdlIHNjcm9sbCBkb3duICovXHJcblx0JCgnLnNlY3Rpb24nKS5vbignY2xpY2snLCAnLm1vdXNlLWJ0bicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcblx0XHRcdHNjcm9sbFRvcDogaGVpZ2h0XHJcblx0XHR9LCA4MDApO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBNZW51IGZpbGxlZCAqL1xyXG5cdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDEwMCkge1xyXG5cdFx0JCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcblx0fVxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAxMDApIHtcclxuXHRcdFx0JCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBJbml0aWFsaXplIG1hc29ucnkgaXRlbXMgKi9cclxuXHR2YXIgJGNvbnRhaW5lciA9ICQoJy5ib3gtaXRlbXMnKTtcclxuXHJcblx0JGNvbnRhaW5lci5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKSB7XHJcblx0XHQkY29udGFpbmVyLm11bHRpcGxlRmlsdGVyTWFzb25yeSh7XHJcblx0XHRcdGl0ZW1TZWxlY3RvcjogJy5ib3gtaXRlbScsXHJcblx0XHRcdGZpbHRlcnNHcm91cFNlbGVjdG9yOiAnLmZpbHRlcnMnLFxyXG5cdFx0XHRwZXJjZW50UG9zaXRpb246IHRydWUsXHJcblx0XHRcdGd1dHRlcjogMFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKiAxMi4gSW5pdGlhbGl6ZSBtYXNvbnJ5IGZpbHRlciAqL1xyXG5cdCQoJy5maWx0ZXJzIGxhYmVsJykub24oJ2NoYW5nZScsICdpbnB1dFt0eXBlPVwicmFkaW9cIl0nLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdCQoJy5mX2J0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuZl9idG4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0XHQvKiBSZWZyZXNoIFBvcnRmb2xpbyBtYWduaWZpYyBwb3B1cCAqL1xyXG5cdFx0JCgnLmhhcy1wb3B1cCcpLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0XHR0eXBlOiAnaW5saW5lJyxcclxuXHRcdFx0b3ZlcmZsb3dZOiAnYXV0bycsXHJcblx0XHRcdGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG5cdFx0XHRtYWluQ2xhc3M6ICdtZnAtZmFkZSdcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvKiBQb3J0Zm9saW8gbWFnbmlmaWMgcG9wdXAgKi9cclxuXHQkKCcuaGFzLXBvcHVwJykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHR0eXBlOiAnaW5saW5lJyxcclxuXHRcdG92ZXJmbG93WTogJ2F1dG8nLFxyXG5cdFx0Y2xvc2VCdG5JbnNpZGU6IHRydWUsXHJcblx0XHRtYWluQ2xhc3M6ICdtZnAtZmFkZSdcclxuXHR9KTtcclxuXHJcblx0LyogZ2FsbGVyeSAqL1xyXG5cdCQoJy5wb3N0LWxpZ2h0Ym94JykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHRkZWxlZ2F0ZTogJ2EnLFxyXG5cdFx0dHlwZTogJ2ltYWdlJyxcclxuXHRcdHRMb2FkaW5nOiAnTG9hZGluZyBpbWFnZSAjJWN1cnIlLi4uJyxcclxuXHRcdG1haW5DbGFzczogJ21mcC1pbWctbW9iaWxlJyxcclxuXHRcdGdhbGxlcnk6IHtcclxuXHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0bmF2aWdhdGVCeUltZ0NsaWNrOiB0cnVlLFxyXG5cdFx0XHRwcmVsb2FkOiBbMCwxXSAvLyBXaWxsIHByZWxvYWQgMCAtIGJlZm9yZSBjdXJyZW50LCBhbmQgMSBhZnRlciB0aGUgY3VycmVudCBpbWFnZVxyXG5cdFx0fSxcclxuXHRcdGltYWdlOiB7XHJcblx0XHRcdHRFcnJvcjogJzxhIGhyZWY9XCIldXJsJVwiPlRoZSBpbWFnZSAjJWN1cnIlPC9hPiBjb3VsZCBub3QgYmUgbG9hZGVkLidcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogVmFsaWRhdGUgY29udGFjdCBmb3JtICovXHJcblx0JChcIiNjZm9ybVwiKS52YWxpZGF0ZSh7XHJcblx0XHRydWxlczoge1xyXG5cdFx0XHRuYW1lOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0dGVsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0bWVzc2FnZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1YmplY3Q6IHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbWFpbDoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxyXG5cdFx0XHRcdGVtYWlsOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBcInZhbGlkXCIsXHJcblx0XHRzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR1cmw6ICdtYWlsZXIvZmVlZGJhY2sucGhwJyxcclxuXHRcdFx0XHR0eXBlOiAncG9zdCcsXHJcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcclxuXHRcdFx0XHRkYXRhOiAnbmFtZT0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJuYW1lXCJdJykudmFsKCkgKyAnJnRlbD0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJ0ZWxcIl0nKS52YWwoKSArICcmZW1haWw9JysgJChcIiNjZm9ybVwiKS5maW5kKCdpbnB1dFtuYW1lPVwiZW1haWxcIl0nKS52YWwoKSArICcmc3ViamVjdD0nKyAkKFwiI2Nmb3JtXCIpLmZpbmQoJ2lucHV0W25hbWU9XCJzdWJqZWN0XCJdJykudmFsKCkgKyAnJm1lc3NhZ2U9JyArICQoXCIjY2Zvcm1cIikuZmluZCgndGV4dGFyZWFbbmFtZT1cIm1lc3NhZ2VcIl0nKS52YWwoKSxcclxuXHRcdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0JCgnI2Nmb3JtJykuZmFkZU91dCgpO1xyXG5cdFx0XHRcdFx0JCgnLmFsZXJ0LXN1Y2Nlc3MnKS5kZWxheSgxMDAwKS5mYWRlSW4oKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiBWYWxpZGF0ZSBjb250YWN0IGZvcm0gKi9cclxuXHQkKFwiI2Jsb2ctZm9ybVwiKS52YWxpZGF0ZSh7XHJcblx0XHRydWxlczoge1xyXG5cdFx0XHRuYW1lOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0bWVzc2FnZToge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHRcdH0sXHJcblx0XHRcdGVtYWlsOiB7XHJcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXHJcblx0XHRcdFx0ZW1haWw6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IFwidmFsaWRcIixcclxuXHRcdHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjYmxvZy1mb3JtJykuZmFkZU91dCgpO1xyXG5cdFx0XHQkKCcuYWxlcnQtc3VjY2VzcycpLmRlbGF5KDEwMDApLmZhZGVJbigpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxufSk7XHJcbiJdfQ==
