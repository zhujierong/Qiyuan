var JRZH = {
	styles: {
		headerHeight: '44px',
		menuHeight: '50px',
	},
	openWindow: function() {},
	navgationInit: function() {

	},
	filterInit: function() {
		var _div_wrap = mui("#sliderSegmentedControl");
		var ul_width = 0;
		var filter_tab_count = mui(".mui-segmented-control.mui-segmented-control-inverted .mui-control-item").length;
		var window_width = window.screen.width;
		var width_count = 0;
		mui(".mui-segmented-control.mui-segmented-control-inverted .mui-control-item").each(function() {
			width_count += this.offsetWidth;
		});
		if(width_count < window_width) {
			var ele1 = document.querySelectorAll("#sliderSegmentedControl .mui-scroll")[0];
			if(!ele1) return;
			ele1.style.width = "100%";
			var elem = document.querySelectorAll(".mui-segmented-control.mui-segmented-control-inverted .mui-control-item")
			mui(elem).each(function() {
				this.style.width = 100 / filter_tab_count + "%";
				this.style.padding = 0;
				this.style.float = "left";
			});
		}
	},
	reg: {
		mobile: function(text) {
			return /^1[34578]\d{9}$/.test(text);
		},
		email: function(text) {
			return /^[a-zA-Z0-9][a-zA-Z0-9_\\.]+[a-zA-Z0-9]@[a-z0-9]{2,7}(\\.[a-z]{2,3}){1,3}$/.test(text);
		}
	}
}