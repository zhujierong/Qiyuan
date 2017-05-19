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
/*
 * 初始化顶部筛选条的宽度比例
 */
JRZH.filterInit();
mui(".mui-bar-nav").on("tap", "#collect", function() {
	$(this).toggleClass("mui-icon-star-filled");
	if($(this).is(".mui-icon-star-filled")) {
		mui.toast("收藏成功");
	} else {
		mui.toast("取消收藏");
	}
});
/*
 * 在线客服电话
 */
mui(".mui-content").on("tap", "#contact-service", function() {
	var tel = this.getAttribute("tel") || "";
	mui.confirm("拨打客服电话？", "", ["否", "是"], function(val) {
		if(val.index == 1)
			plus.device.dial(tel, false);
	});
});