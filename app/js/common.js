$(function() {
	
	$(".topline .sf-menu").superfish({
		cssArrows: false,
		hoverClass: "no-class",
		delay: 200
	});
	

	var owl =	$(".slider");
	
	owl.owlCarousel({
		items: 1,
		loop: true,
		itemClass: "slide-wrap",
		nav: false,
		navText: "",
		smartSpeed: 1000
		
		
	});
	
	$('.next').click(function() {
		owl.trigger('next.owl.carousel');
	})
	
	$('.prev').click(function() {
		owl.trigger('prev.owl.carousel');
	})
	
	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};
	
	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$(".mobile-mnu").click(function() {

		$(".sf-menu").after("<div id='my-menu'></div>");
		$(".sf-menu").clone().appendTo("#my-menu");

		$("#my-menu").mmenu({
			navbar : {
				title : "Меню"
			},
			language : "ru",
			extensions : ["theme-dark", "fx-menu-slide"],
			hooks: {
				"open:start": function() {
					$(".hamburger").addClass("is-active");
					
			 },
			 "close:after": function() {
					$(".hamburger").removeClass("is-active");
			 }
			}
		});

		$("#my-menu").find("*").attr("style", "");
		$("#my-menu").find("ul").removeClass("sf-menu");
		

		var mmAPI = $("#my-menu").data( "mmenu" );
		mmAPI.open();
	});

	$(".services-item h4").equalHeights();
	$(".news-item .news-item-text").equalHeights();

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {
		
	};
	
	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
	
});
