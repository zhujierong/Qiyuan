var appData = {};
appData.dataType = 'json';
appData.type = 'post';
appData.timeout = 10000;

appData.ajaxRTS = function(url, parameters, successcallback, errorcallback) {
	successcallback = successcallback || $.noop;
	errorcallback = errorcallback || $.noop;

	//// 指定允许其他域名访问  
	//header('Access-Control-Allow-Origin:*');  
	//// 响应类型  
	//header('Access-Control-Allow-Methods:POST');  
	//// 响应头设置  
	//header('Access-Control-Allow-Headers:x-requested-with,content-type');  
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
appData.ajaxSYS = function(url, parameters, successcallback, errorcallback) {
	successcallback = successcallback || $.noop;
	errorcallback = errorcallback || $.noop;

	//// 指定允许其他域名访问  
	//header('Access-Control-Allow-Origin:*');  
	//// 响应类型  
	//header('Access-Control-Allow-Methods:POST');  
	//// 响应头设置  
	//header('Access-Control-Allow-Headers:x-requested-with,content-type');  
	mui.ajax(JRZH.port + url, {
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
 * 上传文件
 */
appData.upload = function(parameters, successcallback, errorcallback) {
	appData.ajaxSYS('/sys/ajax/file/upload.json', parameters, successcallback, errorcallback)
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
 * 圈子列表
 */
appData.getDiary = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('bbs/getDiary.json', parameters, successcallback, errorcallback)
};
/*
 * 日记详情
 */
appData.getDetails = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('bbs/getDetails.json', parameters, successcallback, errorcallback)
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
/*
 * 个人 - 日记本
 */
appData.getPersonalDiary = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('bbs/getPersonalDiary.json', parameters, successcallback, errorcallback)
};
/*
 * 个人 - 创建日记本
 */
appData.diaryIssue = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('bbs/diaryIssue.json', parameters, successcallback, errorcallback)
};
/*
 * 健康档案
 */
appData.getMemberFileList = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('memberFile/getList.json', parameters, successcallback, errorcallback)
};
/*
 * 我的订单
 */
appData.record = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('memberRecord/record.json', parameters, successcallback, errorcallback)
};
/*
 * 我的收藏
 */
appData.collectGetList = function(parameters, successcallback, errorcallback, xhrerrorback) {
	appData.ajaxRTS('collect/getList.json', parameters, successcallback, errorcallback)
};