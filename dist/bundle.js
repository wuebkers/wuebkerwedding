'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var slider = function () {
	function slider() {
		_classCallCheck(this, slider);
	}

	_createClass(slider, [{
		key: 'init',
		value: function init() {
			$('.slide-wrapper').slick({
				slidesToShow: 1,
				dots: true
			});
		}
	}]);

	return slider;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Global = function () {
	function Global() {
		_classCallCheck(this, Global);
	}

	_createClass(Global, [{
		key: 'init',
		value: function init() {
			var dir = window.location + 'dist/media/home/slider';
			var fileextension = ".jpg";

			console.log(window.location);

			setTimeout(function () {
				$.ajax({
					//This will retrieve the contents of the folder if the folder is configured as 'browsable'
					url: dir,
					success: function success(data) {
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
	}]);

	return Global;
}();

var global = new Global();
global.init();
//# sourceMappingURL=bundle.js.map
