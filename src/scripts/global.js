class Global {
	constructor() {

	}

	init() {
		var dir = window.location + 'dist/media/home/slider';
		var fileextension = ".jpg";

		console.log(window.location);

		setTimeout(() => {
			$.ajax({
				//This will retrieve the contents of the folder if the folder is configured as 'browsable'
				url: dir,
				success: function (data) {
					//List all .png file names in the page
					$(data).find('a:contains(' + fileextension + ')').each(function () {
						var filename = this.href.replace(window.location, '').replace('http://', '');
						$('.slide-wrapper').append('<div class="slide" style="background - image: url("' + dir + '/' + filename + '"></div >');
					});
				}
			});
		}, 1000);
		


		// $('.slide-wrapper').slick({
		// 	slidesToShow: 1,
		// 	dots: true,
		// 	fade: true,
		// 	autoplay: true,
		// 	autoplaySpeed: 2000
		// });
	}	
}

const global = new Global();
global.init();