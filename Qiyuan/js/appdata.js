var appData = {};
appData.dataType = 'json';
appData.type = 'post';
appData.timeout = 10000;

/*
 * 服务类型
 */
appData.servingType = function(parameters, successcallback, errorcallback) {
	successcallback = successcallback || $.noop;
	errorcallback = errorcallback || $.noop;

	mui.ajax(JRZH.BASE_URL + 'information/informationType.json', {
		data: parameters,
		dataType: appData.dataType,
		type: appData.type,
		timeout: appData.timeout,
		success: function(data) {

			if(data.status == 1) {
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
/*
 * 服务列表
 */
appData.servingList = function(parameters, successcallback, errorcallback, xhrerrorback) {
	successcallback = successcallback || $.noop;
	errorcallback = errorcallback || $.noop;

	mui.ajax(JRZH.BASE_URL + 'information/information.json', {
		data: parameters,
		dataType: appData.dataType,
		type: appData.type,
		timeout: appData.timeout,
		success: function(data) {

			if(data.status == 1) {
				successcallback(data);
			} else {
				errorcallback(data);
			}

		},
		error: function(xhr, type, errorThrown) {
			if(typeof xhrerrorback == "function") xhrerrorback(xhr, type, errorThrown);
			JRZH.xhrError()
		}
	});

};
/*
 * 权威专家 - 列表
 */
appData.specialistList = function(parameters, successcallback, errorcallback, xhrerrorback) {
	successcallback = successcallback || $.noop;
	errorcallback = errorcallback || $.noop;

	mui.ajax(JRZH.BASE_URL + 'information/specialist.json', {
		data: parameters,
		dataType: appData.dataType,
		type: appData.type,
		timeout: appData.timeout,
		success: function(data) {

			if(data.status == 1) {
				successcallback(data);
			} else {
				errorcallback(data);
			}

		},
		error: function(xhr, type, errorThrown) {
			if(typeof xhrerrorback == "function") xhrerrorback(xhr, type, errorThrown);
			JRZH.xhrError()
		}
	});

};
/*
 * 资讯类型
 */
appData.intellectualType = function(parameters, successcallback, errorcallback, xhrerrorback) {
	successcallback = successcallback || $.noop;
	errorcallback = errorcallback || $.noop;

	mui.ajax(JRZH.BASE_URL + 'intellectual/intellectualType.json', {
		data: parameters,
		dataType: appData.dataType,
		type: appData.type,
		timeout: appData.timeout,
		success: function(data) {

			if(data.status == 1) {
				successcallback(data);
			} else {
				errorcallback(data);
			}

		},
		error: function(xhr, type, errorThrown) {
			if(typeof xhrerrorback == "function") xhrerrorback(xhr, type, errorThrown);
			JRZH.xhrError()
		}
	});
};
/*
 * 资讯列表
 */
appData.intellectual = function(parameters, successcallback, errorcallback, xhrerrorback) {
	successcallback = successcallback || $.noop;
	errorcallback = errorcallback || $.noop;

	mui.ajax(JRZH.BASE_URL + 'intellectual/intellectual.json', {
		data: parameters,
		dataType: appData.dataType,
		type: appData.type,
		timeout: appData.timeout,
		success: function(data) {

			if(data.status == 1) {
				successcallback(data);
			} else {
				errorcallback(data);
			}

		},
		error: function(xhr, type, errorThrown) {
			if(typeof xhrerrorback == "function") xhrerrorback(xhr, type, errorThrown);
			JRZH.xhrError()
		}
	});
};
/*
 * 圈子列表
 */
appData.circleList = function(parameters, successcallback, errorcallback, xhrerrorback) {
	successcallback = successcallback || $.noop;
	errorcallback = errorcallback || $.noop;

	mui.ajax(JRZH.BASE_URL + 'bbs/getDiary.json', {
		data: parameters,
		dataType: appData.dataType,
		type: appData.type,
		timeout: appData.timeout,
		success: function(data) {

			if(data.status == 1) {
				successcallback(data);
			} else {
				errorcallback(data);
			}

		},
		error: function(xhr, type, errorThrown) {
			if(typeof xhrerrorback == "function") xhrerrorback(xhr, type, errorThrown);
			JRZH.xhrError()
		}
	});
};