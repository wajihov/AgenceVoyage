package projet.spring.FindMyTravel.services;

import org.springframework.mail.SimpleMailMessage;

public interface EmailService {
	
	public void sendEmail(String to, String subject, String text);

	public void send(SimpleMailMessage message);
	
}
