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