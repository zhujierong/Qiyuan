/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, successcallback, errorcallback) {
		//验证登录
		mui.ajax(JRZH.BASE_URL + 'user/userLogin.json', {
			data: loginInfo,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {

				if(data.status == 1) {
					var users = data.object;
					localStorage.setItem('$users', JSON.stringify(users));
					owner.createState(users);
					successcallback(users);
				} else {
					errorcallback(data);
				}

			},
			error: function(xhr, type, errorThrown) {
				JRZH.xhrError()
			}
		});
	};

	owner.createState = function(data, callback) {
		callback = callback || $.noop;
		var state = owner.getState();
		state.userId = data.userId;
		state.userName = data.userName;;
		state.type = data.type;;
		state.mobile = data.mobile;;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		//储存登录信息
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};
	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};
	/**
	 * 获取应用本地配置
	 * 搁置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	};
	/**
	 * 设置应用本地配置
	 * 搁置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	};
	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;

		mui.ajax(JRZH.BASE_URL + 'user/register.json', {
			data: regInfo,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {

				if(data.status == 1) {
					var users = JSON.parse(localStorage.getItem('$users') || '[]');
					users.push(regInfo);
					localStorage.setItem('$users', JSON.stringify(users));
					successcallback(data);
				} else {
					errorcallback(data);
				}

			},
			error: function(xhr, type, errorThrown) {
				JRZH.xhrError()
			}
		});

	};

	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if(!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function(id) {
			if(id === 'qihoo' && mui.os.plus) {
				return true;
			}
			if(mui.os.android) {
				var main = plus.android.runtimeMainActivity();
				var packageManager = main.getPackageManager();
				var PackageManager = plus.android.importClass(packageManager)
				var packageName = {
					"qq": "com.tencent.mobileqq",
					"weixin": "com.tencent.mm",
					"sinaweibo": "com.sina.weibo"
				}
				try {
					return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
				} catch(e) {}
			} else {
				switch(id) {
					case "qq":
						var TencentOAuth = plus.ios.import("TencentOAuth");
						return TencentOAuth.iphoneQQInstalled();
					case "weixin":
						var WXApi = plus.ios.import("WXApi");
						return WXApi.isWXAppInstalled()
					case "sinaweibo":
						var SinaAPI = plus.ios.import("WeiboSDK");
						return SinaAPI.isWeiboAppInstalled()
					default:
						break;
				}
			}
		}
		/*
		 * 发送验证码
		 */
	owner.sendCode = function(sendElem, mobile, time, successcallback, errorcallback) {
		if(sendElem.classList.contains("disabled")) return;
		if(isNaN(time)) time = 120;
		sendElem.classList.add("disabled");
		sendElem.innerHTML = time + "s再次发送";
		var interTime = setInterval(function() {
			var _number = parseInt(sendElem.innerHTML) - 1;
			sendElem.innerHTML = _number + "s再次发送";
			if(_number <= 0) {
				sendElem.innerHTML = "发送验证码";
				sendElem.classList.remove("disabled");
				clearInterval(interTime);
			}
		}, 1000);
		mui.ajax(JRZH.BASE_URL + 'user/sendMobileMsg.json', {
			data: {
				mobile: mobile
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if(data.status == 1) {
					successcallback(data);
				} else {
					errorcallback(data);
				}
			},
			error: function(xhr, type, errorThrown) {
				sendElem.innerHTML = "发送验证码";
				sendElem.classList.remove("disabled");
				clearInterval(interTime);
				JRZH.xhrError();
			}
		});
	}

}(mui, window.app = {}));