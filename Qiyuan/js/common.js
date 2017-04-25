//自适应
(function(a, d) {
	var b = a.documentElement,
		e = "orientationchange" in window ? "orientationchange" : "resize",
		c = function() {
			var a = b.clientWidth;
			a && (b.style.fontSize = Math.min(a, 750) / 375 * 100 + "px")
		};
	a.addEventListener && (d.addEventListener(e, c, !1), a.addEventListener("DOMContentLoaded", c, !1))
})(document, window);
//筛选宽度计算
JRZH.filterInit();
mui(".mui-bar-nav").on("tap", "#collect", function() {
	$(this).toggleClass("mui-icon-star-filled");
	if($(this).is(".mui-icon-star-filled")) {
		mui.toast("收藏成功");
	} else {
		mui.toast("取消收藏");
	}
});