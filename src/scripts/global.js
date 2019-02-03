class Global {
	constructor() {

	}

	init() {
		// Backround color scroll animation
		$(window).on('scroll', function () {

			var scrollPercent = $(document).scrollTop() / 80;
			var scalePercent = ($(document).scrollTop() / 3000) + 1;
			var opacityPercent = 1 - $(document).scrollTop() / 1000;
			$('.hero__media').attr('style', 'filter: blur(' + scrollPercent + 'px); transform: scale(' + scalePercent + '); opacity:' + opacityPercent + ';');
		});		
	}	
}

const global = new Global();
global.init();