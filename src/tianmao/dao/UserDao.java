package tianmao.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class UserDao {
	
	public String findUserName(String username) {
		String psw = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection connection = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/tianmao02", 
					"root", 
					"dongbo19970416");
			String SQLString = "select * from user where name=?";
			PreparedStatement preparedStatement = connection.prepareStatement(SQLString);
			preparedStatement.setString(1, username);
			ResultSet resultSet = preparedStatement.executeQuery();
			if(resultSet == null) {
				return null;
			}
			if(resultSet.next()) {
				psw = resultSet.getString("password");
			} else {
				psw = null;
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return psw;
	}
	
	//增加用户(包括数据库)
	public void addUser(String username, String psw) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection connection = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/tianmao02", 
					"root", 
					"dongbo19970416");
			String SQLString = "INSERT INTO USER VALUES(?,?)";
			PreparedStatement preparedStatement = connection.prepareStatement(SQLString);
			preparedStatement.setString(1, username);
			preparedStatement.setString(2, psw);
			preparedStatement.execute();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
//	//单独测试使用
//	public static void main(String[] args) {
//		String psw =new UserDao().findUserName("345");
//		System.out.println(psw);
//		UserDao u = new UserDao();
//		u.addUser("345", "345");
//	}
}
