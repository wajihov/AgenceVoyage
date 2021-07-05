package projet.spring.FindMyTravel.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import projet.spring.FindMyTravel.entities.Client;


public interface ClientService {
	public ResponseEntity<Client> addClient(Client c);
	public Boolean verifUserName(String username);
	public ResponseEntity<Client> findOneClient(Integer id);
	public List<Client> findAllClient();
	public ResponseEntity getByUserName(String username);
	public ResponseEntity update(Client c);
	/*public ResponseEntity<?> updateImage(Integer id, String fileName);*/
	boolean deleteClient(Integer id);
	
}
