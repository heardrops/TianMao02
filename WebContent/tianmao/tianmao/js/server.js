/**
 * 功能：查看本地数据cookie中是否有指定的对象(商品),根据id
 * 参数：id:商品的标识
 */
function checkObjByPid(id) {
	var jsonStr = getCookie("datas");
	var jsonObj = JSON.parse(jsonStr);
	var isExist = false;
	for(var i = 0, len = jsonObj.length; i < len; i++) {
		if(jsonObj[i].pid == id) {
			isExist = true;
			break;
		}
	}
	return isExist;
}

/*
 * 功能：更新本地数据cookie
 * 参数：arr  数组对象
 * 返回一个值：最新的本地转换后的数组对象
 */
function updateData(arr) {
	var jsonStr = JSON.stringify(arr);
	setCookie("datas", jsonStr);
	jsonStr = getCookie("datas");
	//console.log(jsonStr);
	//console.log(JSON.parse(jsonStr));
	return JSON.parse(jsonStr);
}

/*
 * 获取商品总数量
 * 返回：数字
 */
function getTotalCount() {
	var totalCount = 0;
	var jsonStr = getCookie("datas");
	var listObj = JSON.parse(jsonStr);
	for(var i = 0, len = listObj.length; i < len; i++) {
		totalCount = listObj[i].pCount + totalCount;
	}
	return totalCount;
}

/*
 * 更新本地数据根据pid
 * id:商品的标识
 * */
function updateObjById(id, num) {
	var jsonStr = getCookie("datas");
	var listObj = JSON.parse(jsonStr);
	for(var i = 0, len = listObj.length; i< len; i++) {
		if(listObj[i].pid == id) {
			listObj[i].pCount = listObj[i].pCount + num;
			break;
		}
	}
	return updateData(listObj);
}

/*
 * 获取本地数据
 * 返回：数组对象
 * */
function getAllData() {
	var jsonStr = getCookie("datas");
	var listObj = JSON.parse(jsonStr);
	return listObj;
}

function deleteObjByPid() {
	var listObj = getAllData();
	for(var i = 0, le = listObj.length; i < len; i++) {
		if(listObj[i].pid == id) {
			listObj.splice(i, 1);
			break;
		}
	}
	updateData(listObj);
	return listObj;
}
