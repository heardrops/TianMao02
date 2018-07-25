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
 * Servlet implementation class RegisteServlet
 */
@WebServlet("/RegisteServlet")
public class RegisteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegisteServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String isPassword = request.getParameter("isPassword");
		//System.out.println(username + "," + password +","+ isPassword);
		if(username == null || username.trim().isEmpty()) {
			request.setAttribute("msg", "用户名不能为空");
			request.getRequestDispatcher("/registe.jsp").forward(request, response);
			return;
		}
		if(password == null || password.trim().isEmpty()) {
			request.setAttribute("msg", "密码不能为空");
			request.getRequestDispatcher("/registe.jsp").forward(request, response);
			return;
		}
		if(!password.equals(isPassword)) {
			request.setAttribute("msg", "两次输入密码不同");
			request.getRequestDispatcher("/registe.jsp").forward(request, response);
			return;
		}
		UserDao user = new UserDao();
		user.addUser(username, password);
//		request.setAttribute("msg", "恭喜" + username + "注册成功");
//		request.getRequestDispatcher("/registe.jsp").forward(request, response);
		HttpSession session = request.getSession();
		session.setAttribute("loginName", username);
		//System.out.println(session.getAttribute(username));
		response.sendRedirect("IndexServlet");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
