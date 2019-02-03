class Global {
	constructor() {

	}

	init() {
		// Backround color scroll animation
		$(window).on('scroll', function () {

			var scrollPercent = $(document).scrollTop() / 80;
			var scalePercent = ($(document).scrollTop() / 30) + 100;
			var opacityPercent = 1 - $(document).scrollTop() / 1000;
			$('.hero__media').attr('style', 'filter: blur(' + scrollPercent + 'px); background-size: ' + scalePercent + '%;');
		});		
	}	
}

const global = new Global();
global.init();