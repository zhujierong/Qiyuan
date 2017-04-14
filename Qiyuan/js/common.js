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
//nav
JRZH.openWindow = function(url) {
	mui.openWindow({
		url: url,
		id: url,
		styles: {
			top: JRZH.styles.HeaderHeight, //新页面顶部位置
			bottom: "0", //新页面底部位置
		},
		extras: {
			//自定义扩展参数，可以用来处理页面间传值
		},
		createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			event: 'titleUpdate', //页面显示时机，默认为titleUpdate事件时显示
			aniShow: "pop-in",
			extras: {} //窗口动画是否使用图片加速
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
			title: '正在加载...', //等待对话框上显示的提示内容
			options: {}
		}
	})
}
mui(".mui-bar-tab").on("tap", ".home", function() {
	console.log("home")
	JRZH.openWindow("../home/index.html");
});
mui(".mui-bar-tab").on("tap", ".server", function() {
	JRZH.openWindow("../server/list_main.html");
});
mui(".mui-bar-tab").on("tap", ".community", function() {
	JRZH.openWindow("../home/index.html");
});
mui(".mui-bar-tab").on("tap", ".mine", function() {
	JRZH.openWindow("../home/index.html");
});
//筛选宽度计算
JRZH.filterInit();