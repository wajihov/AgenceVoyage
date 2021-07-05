package projet.spring.FindMyTravel.services;


import org.springframework.http.ResponseEntity;

import projet.spring.FindMyTravel.entities.Client;
import projet.spring.FindMyTravel.entities.User;


public interface UserService {
	
	public User loadByUsername(String username, String password);
	public User loadByUsernameToken(String username);
	public Boolean userCheckPassword(String username, String password);
	public User updatePassword(User user);
	ResponseEntity<User> findOneUser(Integer id);
	ResponseEntity<User> updateImage(Integer id, String fileName);
	
	
}
