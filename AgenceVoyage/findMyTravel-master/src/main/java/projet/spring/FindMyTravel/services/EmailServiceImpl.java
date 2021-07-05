package projet.spring.FindMyTravel.services;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import projet.spring.FindMyTravel.entities.Mail;

@Service("emailService")
public class EmailServiceImpl implements EmailService{
	
	@Autowired
    public JavaMailSender emailSender;
 
    public void sendEmail(String to, String subject, String text) {
    	
    	SimpleMailMessage message = new SimpleMailMessage();
    	message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);
        emailSender.send(message);

		
        
    }

	@Override
	public void send(SimpleMailMessage message) {
		emailSender.send(message);
		
	}

}
