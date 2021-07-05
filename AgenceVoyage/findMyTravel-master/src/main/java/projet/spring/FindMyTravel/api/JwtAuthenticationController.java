package projet.spring.FindMyTravel.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import projet.spring.FindMyTravel.config.JwtTokenUtil;
import projet.spring.FindMyTravel.entities.*;
import projet.spring.FindMyTravel.services.EmailService;
import projet.spring.FindMyTravel.services.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class JwtAuthenticationController {

	@Autowired
	UserService userservice;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired 
	EmailService emailService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody User user) throws Exception {
		final User userDetails = userservice.loadByUsername(user.getUsername(), user.getPassword());

		if (userDetails == null) {

			return ResponseEntity.ok("error password");
		}
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JWTResponse(token));
	}

	@RequestMapping(value = "/forgotPassword/{email}", method = RequestMethod.POST)
	public ResponseEntity forgotUserPassword(@RequestBody  User user, @PathVariable("email") String email) {
		
		User userDetails = userservice.loadByUsernameToken(user.getUsername());
		
		if(userDetails != null) {
			
			// Create the email
			
	        SimpleMailMessage message = new SimpleMailMessage();
	         
	        message.setTo(email);
	        message.setSubject("Complete Password Reset!");
	        message.setText("To complete the password reset process, please click here: "
	        		+ "http://localhost:4200/user/confirm-reset/userName/"+userDetails.getUsername());
	 
	        // Send Message!
	        this.emailService.send(message);
	        return ResponseEntity.ok(userDetails);
	      

        } 
		else {
            
            return ResponseEntity.notFound().build();
        }
        
		}

	@RequestMapping(value = "/resetPassword/{username}", method = RequestMethod.POST)
	public User resetPassword(@RequestBody User password, @PathVariable("username") String username) {
		
		User userDetails = userservice.loadByUsernameToken(username);
		
		if(userDetails != null) {
			String encodedPssword = bCryptPasswordEncoder.encode(password.getPassword());
			userDetails.setPassword(encodedPssword);
			User userF = userservice.updatePassword(userDetails);
			return userF;
		}
		else {
			return null;
		}
		
		
	}

	
	
	
	

	@RequestMapping(value = "/checkPassword/{userName}", method = RequestMethod.POST)
	public Boolean checkPassword(@RequestBody User user, @PathVariable("userName") String userName) {
		return userservice.userCheckPassword(userName, user.getPassword());
	}
	}
