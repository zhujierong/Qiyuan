var JRZH = {
	styles: {
		HeaderHeight: '44px',
	},
	openWindow: function() {},
	navgationInit: function() {

	},
	filterInit: function() {
		var ul_width = 0;
		var filter_tab_count = mui(".filter-tab ul li").length;
		mui(".filter-tab ul li").each(function() {
			//			ul_width += this.outerWidth()
		});
		console.log(ul_width)
	}
}