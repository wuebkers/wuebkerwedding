class Global {
	constructor() {

	}

	init() {
		// Backround color scroll animation
		$(window).on('scroll', function () {

			var scrollPercent = $(document).scrollTop() / 80;
			var scalePercent = ($(document).scrollTop() / 30) + 100;
			if(window.innerWidth > 768) {
				$('.hero__media').attr('style', 'filter: blur(' + scrollPercent + 'px); background-size: ' + scalePercent + '% auto');
				$(".photos__wrapper a").simpleLightbox();
			}
		});		
	}	
}

const global = new Global();
global.init();