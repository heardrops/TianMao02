/*
 * 思路：
 * 1.当页面加载完成后。根据本地的数据，动态生成表格（购物车列表）
 * 	获取所要操作的节点对象
 * 	判断购物车中是否有数据？
 * 		有：显示出购物列表
 * 		无：提示购物车为空
 * 2.当购物车列表动态生成后，获取tbody里所有的checkBox标签节点对象，看那个
 * 被选中就获取对应行小计进行总价格运算。
 * 3.为每一个checkbox添加onchange事件，根据操作更改zoo总价格
 * 4.全选
 * 5.为加减按钮添加一个鼠标点击事件
 * 	更改改商品的数量
 * 6.删除
 * 	获取所有的删除按钮
 * 	为删除按钮添加一个鼠标点击事件
 * 	删除当前行，并更新本地数据
 */

var listObj = getAllData();
var table = document.getElementById("table");
var box = document.getElementById("box");
var tbody = document.getElementById("tbody");
var totalPrice = document.getElementById("totalPrice");
var allCheck = document.getElementById("allCheck");

//console.log(listObj);
//console.log(listObj.length);

if(listObj.length == 0) {
	box.className = "box";
	table.className = "hide";
	//console.log("00000");
} else {
	box.className = "hide";
	table.className = "";
	console.log(listObj);
	for(var i = 0, len = listObj.length; i < len; i++) {
		var tr = document.createElement("tr");
		tr.setAttribute("pid", listObj[i].pid);
		tr.innerHTML = '<td>' +
			'<input type="checkox" class="ck" />' +
			'</td>' +
			'<td>' +
			'<img src="' + listObj[i].pImg + '" alt="" />' +
			'</td>' +
			'<td>' +
			listObj[i].pDesc +
			'</td>' +
			'<td>' +
			'<button class="down">-<button><input type="text" value="' +
			listObj[i].pCount + '" readonly="resdonly" /><button class="up">+</button>' +
			'</td>' +
			'<td>' +
			'￥<span>' + listObj[i].price + '</span>' +
			'</td>' +
			'<td>' +
			'￥<span>' + listObj[i].price * listObj[i].pCount + '</span>' +
			'</td>' +
			'<td>' +
			'<button class="del" >删除</button>' +
			'</td>';
		tbody.appendChild(tr);
	}
}

/*
 * 功能：计算总价格
 * */
var cks = document.querySelectorAll("tbody .ck");
function getTotalPrice() {
	cks = document.querySelectorAll("tbody .ck");
	var sum = 0;
	for(var i = 0, len = cks.length; i < len; i++) {
		if(cks[i].checked) {
			var tr = cks[i].parentNode.parentNode;
			var temp = tr.children[5].firstElementChild.innerHTML;
			sum = Number(temp) + sum;
		}
	}
	return sum;
}

//循环遍历为每一个checkbox添加一个onchange事件,根据操作更改总价格
for(var i = 0, len = cks.length; i < len; i++) {
	cks[i].onchange = function() {
		checkAllChecked();
		totalPrice.innerHTML = getTotalPrice();
	}
}

//全选
allCheck.onchange = function() {
	if(this.checked) {
		for(var i= 0, len = cks.length; i < len; i++) {
			cks[i].checked = true;
		}
	} else {
		for(var i = 0, len = cks.length; i < len; i++) {
			cks[i].checked = false;
		}
	}
	totalPrice.innerHTML = getTotalPrice();
}

var downs = document.querySelectorAll(".down");//减按钮
var ups = document.querySelectorAll(".up");//加
var dels = document.querySelectorAll(".del");//删除
for(var i = 0, len = downs.length; i < len; i++) {
	downs[i].onclick = function() {
		var txtObj = this.nextElementSibling.firstElementChild;//下一个兄弟节点
		var tr = this.parentNode.parentNode;
		var pid = tr.getAttribute("pid");
		txtObj.value = txtObj.value -1;
		if(txtObj.value < 1) {
			txtObj.value = 1;
			updateObjById(pid, 0);//更新本地数据库cookie
		} else {
			updateObjById(pid, -1);
		}
		tr.children[0].firstElementChild.checked = true;
		checkAllChecked();
		var price = tr.children[4].firstElementChild.innerHTML;
		tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
	    totalPrice.innerHTML = getTotalPrice();
	}
	
	ups[i].onclick = function() {
        var txtObj = this.previousElementSibling.firstElementChild;//上一个兄弟节点
        var tr = this.parentNode.parentNode;
        var pid = tr.getAttribute("pid");
        txtObj.value = Number(txtObj.value) + 1;
        updateObjById(pid, 1)
        tr.children[0].firstElementChild.checked = true;
        checkAllChecked()
        var price = tr.children[4].firstElementChild.innerHTML;
        tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
        totalPrice.innerHTML = getTotalPrice();
    }

	dels[i].onclick = function() {
        var tr = this.parentNode.parentNode;
        var pid = tr.getAttribute("pid")
        if(confirm("确定删除？")) {
            //remove()  自杀
            tr.remove();
            listObj = deleteObjByPid(pid);
        }
        if(listObj.length == 0) { //购物车为空
            box.className = "box";
            table.className = "hide";
        } else {
            box.className = "box hide";
            table.className = "";
        }
        totalPrice.innerHTML = getTotalPrice();
    }
}

/*检测是否要全选
 * 当几个商品都选中的话，就全选
 * */
function checkAllChecked() {
    var isSelected = true; //全选是否会选中
    for(var j = 0, len = cks.length; j < len; j++) {
        if(cks[j].checked == false) {
            isSelected = false;
            break;
        }
    }
    allCheck.checked = isSelected;
}
