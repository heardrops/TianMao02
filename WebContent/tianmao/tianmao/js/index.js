(function() {
	var productCid = "";

	//得到商品数组
	function productlList(cid) {
		if(cid == 00) {
			productCid = products.product_00;
		} else if(cid == 01) {
			productCid = products.product_01;
		} else if(cid == 02) {
			productCid = products.product_02;
		} else if(cid == 03) {
			productCid = products.product_03;
		} else if(cid == 04) {
			productCid = products.product_04;
		} else if(cid == 05) {
			productCid = products.product_05;
		} else if(cid == 06) {
			productCid = products.product_06;
		} else if(cid == 07) {
			productCid = products.product_07;
		} else if(cid == 08) {
			productCid = products.product_08;
		} else if(cid == 09) {
			productCid = products.product_09;
		} else if(cid == 10) {
			productCid = products.product_10;
		} else if(cid == 11) {
			productCid = products.product_11;
		} else if(cid == 12) {
			productCid = products.product_12;
		} else if(cid == 13) {
			productCid = products.product_13;
		} else {
			productCid = products.product_14;
		}
		return productCid;
	}
	
	//显示猫耳朵
	$("div.goodsLink a").mouseenter(function() {
		var left = $(this).offset().left;
		var top = $(this).offset().top;
		var width = $(this).width();
		var catLeft = parseInt(left) + parseInt(width)/2 - 30;
		$("img#catEar").css("left", catLeft);
		$("img#catEar").css("top", top-20);
		$("img#catEar").show();
	});

	//隐藏猫耳朵
	$("div.goodsLink a").mouseleave(function() {
		$("img#catEar").hide();
	});

	//显示商品列表
	function showProduct(cid) {
		$("div.eachCategory[cid="+cid+"]").css("background", "white");
		$("div.eachCategory[cid="+cid+"] a").css("color", "#9EE0FD");

		//加载商品内容
		var pcid = productlList(cid);
		//console.log(pcid);
		var str = "";
		for(var i = 0; i < pcid.length; i++) {
			var num = parseInt(Math.random()*10);//产生1-10的随机数
			str += "<tr>";
			for(var j = 0; j < pcid[i].length; j++) {
				if(j == num) {//随机变换字体颜色
					str += "<td style='color:#9FD4F2;padding:20px 15px 5px 20px;font-size:15px;'>";
					str += pcid[i][j] + "</td>&nbsp;&nbsp;&nbsp;";
					continue;
				}
				str += "<td style='color:#999999;padding:20px 15px 5px 20px;font-size:15px;'>";
				str += pcid[i][j] + "</td>&nbsp;&nbsp;&nbsp;";
			}
			str += "</tr><td>";
		}
		$("div.rightMenu[cid="+cid+"]").html(str);

		$("div.rightMenu[cid="+cid+"]").show();
	}

	//隐藏商品列表
	function hideProduct(cid) {
		$("div.eachCategory[cid="+cid+"]").css("background", "#E2E2E3");
		$("div.eachCategory[cid="+cid+"] a").css("color", "black");
		$("div.rightMenu[cid="+cid+"]").hide();
	}

	/*当鼠标移入菜单项，显示对应列表*/
	$("div.eachCategory").mouseenter(function() {
		var cid = $(this).attr("cid");
		showProduct(cid);
	});

	/*当鼠标移出菜单项，隐藏对应列表*/
	$("div.eachCategory").mouseleave(function() {
		var cid = $(this).attr("cid");
		hideProduct(cid);
	});

	/*当鼠标移入商品列表区，显示对应列表*/
	$("div.rightMenu").mouseenter(function() {
		var cid = $(this).attr("cid");
		showProduct(cid);
	});

	/*当鼠标移出商品列表区，隐藏对应列表*/
	$("div.rightMenu").mouseleave(function() {
		var cid = $(this).attr("cid");
		hideProduct(cid);
	});
	
	if(decodeURIComponent(getCookie("userName"))) {
		var loginName = decodeURIComponent(getCookie("userName"));
		$("a#login").html(loginName);
	} else {
		$("a#login").html("请登录");
	}
	
	
	//注册成功或登陆成功，index.html显示用户名
	$(document).ready(function() {//文档载入完成后执行的函数	
		$.ajax({
			url: "IndexServlet",
			type: "get",
			async: true,//异步
			success: function(data) {
				//$("a#login").html(data);
				//console.log(data);
				userName = encodeURIComponent(data);//js编码
				setCookie("userName", userName, 30);
				//console.log(userName);
			},
			error: function() {
				$("a#login").html("系统问题");
			}
		});
	});
	
	$("#off").click(function() {
		delCookie("userName");
	});
	
	/**
	 * 购物车模块
	 * 思路：
     *  第一步：获取所要操作的节点对象
     *  第二步：当页面加载完后，需要计算本地cookie存了多少【个】商品，把个数赋值给ccount
     *  第三步：为每一个商品对应的添加购物车按钮绑定一个点击事件onclick
     *       更改本地的cookie
     *       获取当前商品的pid
     *       循环遍历本地的cookie转换后的数组，取出每一个对象的pid进行对比，若相等则该商品不是第一次添加
     *  从购物车中取出该商品，然后更pCount值追加1,否则：创建一个新的对象，保存到购物中。同时该商品的数量为1
     *  否则：创建一个新的对象，保存到购物中。同时该商品的数量为1
	 * */
	var ccount = document.getElementById("ccount");
	var btns = document.querySelectorAll(".iptAdd");//所有购物车按钮
	//console.log(btns);
	var listStr = getCookie("datas");
	if(!listStr) {
		setCookie("datas", "[]");
		listStr = getCookie("datas");
	}
	var listObj = JSON.parse(listStr);//用于将一个 JSON 字符串转换为对象
	var totalCount = 0;
	/*循环遍历数组，获取每一个对象中的pCount值相加总加*/
	for(var i = 0, len = listObj.length; i < len; i++) {
		totalCount = listObj[i].pCount + totalCount;
	}
	//console.log(listStr+"________________");
	//console.log(listObj+"______________________");
	ccount.innerHTML = totalCount;
	/*循环为每一个按钮添加点击事件*/
	for(var i = 0, len = btns.length; i < len; i++) {
		btns[i].onclick = function() {
			var d1 = this.parentNode;
			var pid = d1.getAttribute("pid");
			//console.log(pid);
			var arrs = d1.children;//获取所有子节点
			//console.log(arrs);
			if(checkObjByPid(pid)) {//如果本地cookie中存在，数量加1
				listObj = updateObjById(pid, 1);
			} else {//本地cookie中不存在此商品
				var imgSrc = arrs[0].firstElementChild.src;
				var pDesc = arrs[1].firstElementChild.innerHTML;
				var price = arrs[2].innerHTML;
				var obj = {
						pid: pid,
						PImg: imgSrc,
						pDesc: pDesc,
						price: price,
						pCount: 1
				};
				listObj.push(obj);
				listObj = updateData(listObj);
			}
			ccount.innerHTML = getTotalCount();
		}
	}
})()