class Global {
	constructor() {

	}

	init() {
		// Backround color scroll animation
		$(window).on('scroll', function () {

			var scrollPercent = $(document).scrollTop() / 80;
			var scalePercent = ($(document).scrollTop() / 30) + 100;
			if(window.innerWidth > 700) {
				$('.hero__media').attr('style', 'filter: blur(' + scrollPercent + 'px); background-size: ' + scalePercent + '% auto');
			} else {
				$('.hero__media').attr('style', 'filter: blur(' + scrollPercent + 'px); background-size:  auto ' + scalePercent + '%');
			}
		});		
	}	
}

const global = new Global();
global.init();