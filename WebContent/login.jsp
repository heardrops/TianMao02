<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>用户登陆</title>
</head>
<body>
	<form action="LoginServlet" method="get">
		   用户名&nbsp;&nbsp;&nbsp;：<input name="username"><br>
		   密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：<input type="password" name="password"><br>
		 <input type="submit" value="登陆">
	</form>
	<input type="button" value="返回主页" onclick="window.location='index.html'">
	<div style="color:red;font-size:30px">${msg}</div>
</body>
</html>