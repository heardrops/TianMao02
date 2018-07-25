/**
 * 得到XMLHttpRequest对象
 */
function getXHR() {
	var xmlhttp;
	if(window.XMLHttpRequest) {
		//IE7+,Firefox,Chrome,Opera....
		xmlhttp = new XMLHttpRequest();
	} else {
		//IE6,IE5
		xmlhttp = new ActiveXObject("Microsoft.XmlHTTP");
	}
	return xmlhttp;
}

//cookie的设置，获取，删除
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = encodeURIComponent(cname)+"="+encodeURIComponent(cvalue)+"; "+expires;
}
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) {
			return decodeURIComponent(c.substring(name.length,c.length)); 
		}
	}
	return "";
}
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
