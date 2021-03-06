/*!
 * ======================================================
 * JRZH_upImg
 * =======================================================
 * @version:1.0.0
 * 
 */
(function() {
	var index = 1;
	var size = null;
	var imageIndexIdNum = 0;
	var starIndex = 0;
	var state = app.getState();
	var userId = state.userId;
	var feedback = {
		//		question: document.getElementById('question'), //问题和意见
		//		contact: document.getElementById('contact'), //联系方式
		imageList: document.getElementById('image-list'), //上传的图片
		submitBtn: document.getElementById('submit') //提交的按钮
	};
	var url = 'https://service.dcloud.net.cn/feedback';
	feedback.files = [];
	feedback.allfiles = [];
	feedback.uploader = null;
	feedback.upfiles = null;
	feedback.deviceInfo = null;
	mui.plusReady(function() {
		//设备信息，无需修改
		feedback.deviceInfo = {
			appid: plus.runtime.appid,
			imei: plus.device.imei, //设备标识
			images: feedback.files, //图片文件
			p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
			md: plus.device.model, //设备型号
			app_version: plus.runtime.version,
			plus_version: plus.runtime.innerVersion, //基座版本号
			os: mui.os.version,
			net: '' + plus.networkinfo.getCurrentType()
		}
	});
	/**
	 *提交成功之后，恢复表单项 
	 */
	feedback.clearForm = function() {
		//		feedback.question.value = '';
		//		feedback.contact.value = '';
		feedback.imageList.innerHTML = '';
		feedback.newPlaceholder();
		feedback.files = [];
		index = 0;
		size = 0;
		imageIndexIdNum = 0;
		starIndex = 0;
		//清除所有星标
		mui('.icons i').each(function(index, element) {
			if(element.classList.contains('mui-icon-star-filled')) {
				element.classList.add('mui-icon-star')
				element.classList.remove('mui-icon-star-filled')
			}
		})
	};
	feedback.getFileInputArray = function() {
		return [].slice.call(feedback.imageList.querySelectorAll('.file'));
	};
	feedback.addFile = function(path, obj) {
		var imgInfo = Object.assign({
			name: "images" + index,
			path: path
		}, obj);
		feedback.files.push(imgInfo);
		index++;
	};
	/**
	 * 初始化图片域占位
	 */
	feedback.newPlaceholder = function() {
		var fileInputArray = feedback.getFileInputArray();
		if(fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		};
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		var up = document.createElement("div");
		up.setAttribute('class', 'image-up');
		//删除图片
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		//小X的点击事件
		closeButton.addEventListener('tap', function(event) {

			setTimeout(function() {
				feedback.imageList.removeChild(placeholder);
			}, 0);
			setTimeout(function() {
				console.log("-----删除按钮后 files 的变化-------");
				console.log(JSON.stringify(feedback.files));
			}, 2000);

			return false;
		}, false);

		//
		var fileInput = document.createElement('div');
		fileInput.setAttribute('class', 'file');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		/*
		 * 添加图片 - 上传到服务器
		 */
		fileInput.addEventListener('tap', function(event) {
			var self = this;
			var index = (this.id).substr(-1);

			plus.gallery.pick(function(e) {
				var name = e.substr(e.lastIndexOf('/') + 1);
				//图片压缩
				plus.zip.compressImage({
					src: e,
					dst: '_doc/' + name,
					overwrite: true,
					quality: 50
				}, function(zip) {
					size += zip.size;
					//console.log("filesize:" + zip.size + ",totalsize:" + size);
					if(size > (10 * 1024 * 1024)) {
						return mui.toast('文件超大,请重新选择~');
					}
					if(!self.parentNode.classList.contains('space')) { //已有图片
						feedback.files.splice(index - 1, 1, {
							name: "images" + index,
							path: e
						});
					} else {
						placeholder.classList.remove('space');
						feedback.upload(zip.target, name);
						feedback.newPlaceholder();
					}
					up.classList.remove('image-up');
					placeholder.style.backgroundImage = 'url(' + zip.target + ')';
				}, function(zipe) {
					mui.toast('压缩失败！')
				});
			}, function(e) {
				mui.toast(e.message);
			}, {});
		}, false);

		feedback.upload = function(path, name) {
			var url = JRZH.port + "/sys/ajax/file/upload.json";
			feedback.upfiles = plus.uploader.createUpload(url, {
				method: 'POST'
			}, function(upload, status) {

				if(status == 200) {
					var data = JSON.parse(upload.responseText);
					console.log("上传到服务器的文件:" + upload.responseText);
					feedback.addFile(path, {
						fileName: data.fileName,
						fileType: data.fileType,
						fileUrl: data.relativeFilePath
					});
					console.log("-------查看文件内容-------");
					console.log(JSON.stringify(feedback.files));

				} else {
					console.log("upload fail");
				}

			});
			//添加上传文件 - 添加要上传的文件
			feedback.upfiles.addData("model", "app/circle");
			feedback.upfiles.addFile(path, {
				key: name
			});
			//开始上传任务
			feedback.upfiles.start();
		};

		placeholder.appendChild(closeButton);
		placeholder.appendChild(up);
		placeholder.appendChild(fileInput);
		feedback.imageList.appendChild(placeholder);

	};
	feedback.newPlaceholder();
	feedback.submitBtn.addEventListener('tap', function(event) {
		//		if(feedback.question.value == '' ||
		//			(feedback.contact.value != '' &&
		//				feedback.contact.value.search(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|([1-9]\d{4,9})$/) != 0)) {
		//			return mui.toast('信息填写不符合规范');
		//		}
		//		if(feedback.question.value.length > 200 || feedback.contact.value.length > 200) {
		//			return mui.toast('信息超长,请重新填写~')
		//		}
		//判断网络连接
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			return mui.toast("连接网络失败，请稍后再试");
		}
		feedback.send(mui.extend({}, feedback.deviceInfo, {
			//			content: feedback.question.value,
			//			contact: feedback.contact.value,
			images: feedback.files,
			score: '' + starIndex
		}))
	}, false);

	feedback.send = function(content) {
		var userId = userId;
		appData.newsDiary({
			
		}, function(response) {
			console.log(JSON.stringify(response));
		}, function(err) {
			mui.toast(err.message);
		});
		//		var url = ""
		//		feedback.uploader = plus.uploader.createUpload(url, {
		//			method: 'POST'
		//		}, function(upload, status) {
		//			//			plus.nativeUI.closeWaiting()
		//			console.log("upload cb:" + upload.responseText);
		//			if(status == 200) {
		//				var data = JSON.parse(upload.responseText);
		//				//上传成功，重置表单
		//				if(data.ret === 0 && data.desc === 'Success') {
		//					//					mui.toast('反馈成功~')
		//					console.log("upload success");
		//					//					feedback.clearForm();
		//				}
		//			} else {
		//				console.log("upload fail");
		//			}
		//
		//		});
		//		添加上传数据
		//		feedback.uploader.addData(index, element);
		//		feedback.uploader.addData(index, element);
		//		feedback.uploader.addData(index, element);
		//			//添加上传文件 - 添加要上传的文件
		//		feedback.uploader.addFile(files, feedback.files);
		//		//开始上传任务
		//		feedback.uploader.start();
	};

})();