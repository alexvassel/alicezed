(function($){

	var $scrollUpButton = $('.js-scroll-up'),
		$fullHeightBlock = $('.js-height-full');

    function init(){
        bindEvents();
        resizeMainImage();
        activateTextRotator();
        stickyNavbar();
        resizeMainImage();
        activateTwitter();
        activatePortfolioShuffle();
        addWowScroll();
        sendContactForm();
        activateGoogleMaps();
        activateSchemeSlider();
    }

    function bindEvents(){
        /* preloader  */
        $(window).load(function() {
            $('.js-status').fadeOut();
            $('.js-preloader').delay(350).fadeOut('slow');
        });

        /* scrollToTop */
        $('a[href*=#]').bind("click", function(e){
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $scrollUpButton.fadeIn();
            } else {
                $scrollUpButton.fadeOut();
            }
        });

        $(window).resize(function(){
            resizeMainImage();
        });
    }

    function activateTextRotator(){
    	var $rotate = $('.rotate');

    	if ($rotate.length > 0){
    		$rotate.textrotator({
	            animation: 'dissolve',
	            separator: '|',
	            speed: 3500
	        });
    	}
    }

    function stickyNavbar(){
    	$('.js-header').sticky({
            topSpacing: 0
        });

        $('body').scrollspy({
            target: '.navbar-custom',
            offset: 80
        })
    }

    function resizeMainImage(){
    	$fullHeightBlock.height($(window).height());
    }

    function activateTwitter(){
    	if(typeof(fetch) === 'function'){
    		var twitterConfig = {
	            id: '585523364418191360',
	            domId: '',
	            maxTweets: 3,
	            enableLinks: true,
	            showUser: false,
	            customCallback: handleTweets
	        };
	        twitterFetcher.fetch(twitterConfig);
    	}
    }

    function handleTweets(tweets) {
    	var $testimonials = $('.testimonials');

        if($testimonials.length > 0){
        	var x = tweets.length;
	        var n = 0;
	        var html = '';

	        while(n < x) {
	            html += '<div class="owl-item">' + tweets[n] + '</div>';
	            n++;
	        }

	        $testimonials.html(html);

	        $('.twitter_retweet_icon').html('<i class="fa fa-retweet"></i>');
	        $('.twitter_reply_icon').html('<i class="fa fa-reply"></i>');
	        $('.twitter_fav_icon').html('<i class="fa fa-star"></i>');


	        $testimonials.owlCarousel({
	            singleItem: true,
	            navigation: false,
	            pagination: false,
	            slideSpeed: 300,
	            rewindNav: false,
	            paginationSpeed: 400,
	            autoPlay: 5000
	        });
	    }
    }

    function activateSchemeSlider(){
    	var $scheme = $('.js-scheme');

    	if($scheme.length > 0){
    		$scheme.owlCarousel({
	            navigation: true,
	            pagination: false,
	            slideSpeed: 300,
	            rewindNav: false,
	            paginationSpeed: 400,
	            items: 5,
	            navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
	        });
    	}
    }

    function activatePortfolioShuffle(){

    	var $portfolioContainer = $('.portfolio-items-container'),
    		$portfolioItem = $('#filter li');

    	if($portfolioContainer.length > 0) {
    		$portfolioItem.on('click', function (e) {
	            e.preventDefault();

	            $portfolioItem.removeClass('active');
	            $(this).addClass('active');

	            var groupName = $(this).attr('data-group');

	            $portfolioContainer.shuffle('shuffle', groupName );
	        });

	        $('.simple-ajax-popup').magnificPopup({
	            type: 'ajax',
	            fixedContentPos: true,
	            callbacks: {
	                beforeOpen: function() { $('html').addClass('mfp-helper'); },
	                close: function() { $('html').removeClass('mfp-helper'); },
	                parseAjax: function(mfpResponse) {
	                    $.getScript('assets/js/custom-portfolio.js');
	                },
	            }
	        });
    	}
    }

    function addWowScroll(){
    	wow = new WOW({
            mobile: false
        });
        wow.init();
    }

    function sendContactForm(){
    	var $form = $('#contact-form');

    	$form.submit(function(e) {

            e.preventDefault();

            var c_name = $('#c_name').val();
            var c_email = $('#c_email').val();
            var c_message = $('#c_message ').val();
            var responseMessage = $form.find('.ajax-response');

            if (( c_name== '' || c_email == '' || c_message == '') || (!checkEmailValidation(c_email) )) {
                responseMessage.fadeIn(500);
                responseMessage.html('<i class="fa fa-warning"></i> Пожалуйста, исправьте ошибки и попробуйте ещё раз');
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'assets/php/contactForm.php',
                    dataType: 'json',
                    data: {
                        c_email: c_email,
                        c_name: c_name,
                        c_message: c_message
                    },
                    beforeSend: function(result) {
                        $form.find('button').empty().append('<i class="fa fa-cog fa-spin"></i> Подождите...');
                    },
                    success: function(result) {
                        if(result.sendstatus == 1) {
                        	$form.find('.ajax-hidden').fadeOut(500);
                            responseMessage.html(result.message).fadeIn(500);
                        } else {
                            $form.find('button').empty().append('<i class="fa fa-retweet"></i> Попробуйте еще раз.');
                            responseMessage.html(result.message).fadeIn(1000);
                        }
                    }
                });
            }

            return false;

        });
    }

    function checkEmailValidation(emailAddress){
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    }

    function activateGoogleMaps(){
    	if(typeof(google) === 'object'){
	    	var mapLocation = new google.maps.LatLng(55.658981, 37.541319,17);

	        map = new GMaps({
	            streetViewControl : false,
	            overviewMapControl: false,
	            mapTypeControl: false,
	            zoomControl : false,
	            panControl : false,
	            scrollwheel: false,
	            center: mapLocation,
	            el: '#map',
	            zoom: 16,
	            styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
	        });

	        var image = new google.maps.MarkerImage('assets/images/map-icon.png',
	            new google.maps.Size(80, 80),
	            new google.maps.Point(0, 0),
	            new google.maps.Point(40, 40)
	        );

	        map.addMarker({
	            position: mapLocation,
	            icon: image,
	            animation: google.maps.Animation.BOUNCE,
	        });
	    }
    }

    init();

})(jQuery);