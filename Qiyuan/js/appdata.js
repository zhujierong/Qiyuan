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
	}
	/*
	 * 服务列表
	 */
appData.servingList = function(parameters, successcallback, errorcallback) {
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
			JRZH.xhrError()
		}
	});

}
