var appData = {};
appData.dataType = 'json';
appData.type = 'post';
appData.timeout = 10000;

appData.ajaxRTS = function(url, parameters, successcallback, errorcallback) {
	successcallback = successcallback || $.noop;
	errorcallback = errorcallback || $.noop;

	mui.ajax(JRZH.BASE_URL + url, {
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
 * 服务类型
 */
appData.servingType = function(parameters, successcallback, errorcallback) {
	appData.ajaxRTS('information/informationType.json', parameters, successcallback, errorcallback)
};
/*
 * 服务列表
 */
appData.servingList = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('information/information.json', parameters, successcallback, errorcallback)
};
/*
 * 权威专家 - 列表
 */
appData.specialistList = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('information/specialist.json', parameters, successcallback, errorcallback)
};
/*
 * 资讯类型
 */
appData.intellectualType = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('intellectual/intellectualType.json', parameters, successcallback, errorcallback)
};
/*
 * 资讯列表
 */
appData.intellectual = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('intellectual/intellectual.json', parameters, successcallback, errorcallback)
};
/*
 * 圈子列表 - 最新
 */
appData.getDiary = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('bbs/getDiary.json', parameters, successcallback, errorcallback)
};
/*
 * 圈子 - 点赞 
 */
appData.diaryPraise = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('bbs/diaryPraise.json', parameters, successcallback, errorcallback)
};
/*
 * 圈子 - 取消点赞 
 */
appData.cancelDiaryPraise = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('bbs/cancelDiaryPraise.json', parameters, successcallback, errorcallback)
};
/*
 * 个人账户
 */
appData.personalInfo = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('bbs/personalInfo.json', parameters, successcallback, errorcallback)
};