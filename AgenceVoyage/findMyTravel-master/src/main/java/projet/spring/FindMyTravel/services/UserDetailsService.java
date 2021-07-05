package projet.spring.FindMyTravel.services;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import projet.spring.FindMyTravel.entities.*;


@Service("userservice")
public class UserDetailsService implements UserService{

@Autowired
PasswordEncoder passwordEncoder;
	@PersistenceContext
	EntityManager em;
	
	
	@Override
	public User loadByUsername(String username, String password) {
		
		TypedQuery<User> query = (TypedQuery<User>) em.createQuery("SELECT u FROM User u WHERE u.userName = :username" ,User.class);
		User u=query.setParameter("username", username).getSingleResult();
		
         Boolean decodedPassword = passwordEncoder.matches(password, u.getPassword());
		 if(decodedPassword) {
				return  u;	
		 } else {
			 return null;
		 }
	}
	
	@Override
	public User loadByUsernameToken(String username) {
		
		TypedQuery<User> query = (TypedQuery<User>) em.createQuery("SELECT u FROM User u WHERE u.userName = :username" ,User.class);
		User u=query.setParameter("username", username).getSingleResult();
		
        return  u;	
		 
	}
	
	@Override
	public Boolean userCheckPassword(String username, String password) {
		
		TypedQuery<User> query = (TypedQuery<User>) em.createQuery("SELECT u FROM User u WHERE u.userName = :username" ,User.class);
		User u=query.setParameter("username", username).getSingleResult();
		
         Boolean decodedPassword = passwordEncoder.matches(password, u.getPassword());
		 if(decodedPassword) {
				return  true;	
		 } else {
			 return false;
		 }
	}
	@Transactional
	public User updatePassword(User user) {
		return em.merge(user);
	}
	@Transactional
	@Override
	public ResponseEntity<User> findOneUser(Integer id) {
		User u = em.find(User.class, id);
		if(u==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(u);
	}
	
	@Transactional
	@Override
	public ResponseEntity<User> updateImage(Integer id, String fileName) {
		User user = em.find(User.class, id);
		user.setImage(fileName);
		//System.out.print("----ID-----"+id+"----"+fileName);
		em.merge(user);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(user);
	}
	

}
