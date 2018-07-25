package tiaomao.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import tianmao.dao.UserDao;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		//System.out.println("接收到来自客户端的信息");
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String psw = new UserDao().findUserName(username);
		if(psw == null) {
			request.setAttribute("msg", "没有这个用户");
			request.getRequestDispatcher("/login.jsp").forward(request, response);
			return;
		}
		if(psw != null && !psw.equals(password)) {
			request.setAttribute("msg", "密码输入错误，请重新输入");
			request.getRequestDispatcher("/login.jsp").forward(request, response);
			return;
		}
		if(psw.equals(password)) {//用户登陆成功
//			request.setAttribute("msg", "用户:"+username+",欢迎访问");
//			request.getRequestDispatcher("/index.html").forward(request, response);
			HttpSession session = request.getSession();
			session.setAttribute("loginName", username);
			response.sendRedirect("IndexServlet");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
