package projet.spring.FindMyTravel.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projet.spring.FindMyTravel.entities.Client;
import projet.spring.FindMyTravel.entities.Company;
import projet.spring.FindMyTravel.services.ClientService;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/Client")
public class ClientAPI {
	
	@Autowired
	ClientService clientService;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	@PostMapping(value="/addClient")
	public ResponseEntity<Client> addClient(@RequestBody Client c){
		String encodedPssword = bCryptPasswordEncoder.encode(c.getPassword());
		c.setImage("avatar.png");
		c.setPassword(encodedPssword);
		return clientService.addClient(c);
		
	}
	
	
	@GetMapping(value="verifUserName/{username}")
	public Boolean verifUserName(@PathVariable("username") String username) {
		return clientService.verifUserName(username);
		
	}

	@GetMapping(value="/getAllClient")
	public List<Client> getAllClient(){
		return clientService.findAllClient();
	}
	
	@GetMapping(value="/getClient/{id}")
	public ResponseEntity<Client> getClientById(@PathVariable("id") Integer id){
		return clientService.findOneClient(id);
	}
	@GetMapping(value="/getProfile/{userName}")
	public ResponseEntity getByUserName(@PathVariable("userName") String userName) {
		return clientService.getByUserName(userName);
	}
	@PutMapping(value="/update")
	public ResponseEntity updateClient(@RequestBody Client c ) {
		return clientService.update( c);
	}
	@GetMapping(value="/delete/{id}")
	public boolean deleteClient(@PathVariable("id") Integer id){
		return clientService.deleteClient(id);
	}
	
}
