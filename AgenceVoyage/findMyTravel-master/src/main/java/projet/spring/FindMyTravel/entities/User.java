package projet.spring.FindMyTravel.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


//import projet.spring.FindMytravel.config.BCryptManagerUtil;

@Entity
public class User implements Serializable {
	private static final long serialVersionUID = 5926468583005150707L;
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Integer id;

protected String userName;
protected String password;
protected String image;

public String getImage() {
	return image;
}
public void setImage(String image) {
	this.image = image;
}
public String getUserName() {
	return userName;
}

@Enumerated(EnumType.STRING)
protected Status status;
protected Date lastCnxDate;

@Enumerated(EnumType.STRING)
protected Role role;

public User() {
	super();
	// TODO Auto-generated constructor stub
}
public User(String userName, String password, String image) {
	super();
	this.userName = userName;
	this.password = password;
	this.image = image;
	//BCryptManagerUtil.passwordEncoder().encode(password);
}

public Integer getId() {
	return id;
}

public void setId(Integer id) {
	this.id = id;
}

public String getUsername() {
	return userName;
}

public void setUserName(String userName) {
	this.userName = userName;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public Status getStatus() {
	return status;
}

public void setStatus(Status status) {
	this.status = status;
}

public Date getLastCnxDate() {
	return lastCnxDate;
}

public void setLastCnxDate(Date lastCnxDate) {
	this.lastCnxDate = lastCnxDate;
}

public Role getRole() {
	return role;
}

public void setRole(Role role) {
	this.role = role;
}

@Override
public String toString() {
	return "{\"id\":" + id + ", \"username\":" + userName +  ", \"role\":" + role
			+ "}";
}

}
