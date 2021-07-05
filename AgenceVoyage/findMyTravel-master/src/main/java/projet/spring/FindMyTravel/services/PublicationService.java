package projet.spring.FindMyTravel.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import projet.spring.FindMyTravel.entities.Cursus;
import projet.spring.FindMyTravel.entities.Publication;

public interface PublicationService {
	
	ResponseEntity<Publication> addPublication(Publication p);

	ResponseEntity<Publication> findOnePublication(Integer id);

	List<Publication> findAllPublication();
	
	List<Publication> findAllPublicationById(Integer id);
	
	ResponseEntity<Publication> editPublication(Publication p, Integer id);
	
	ResponseEntity<Publication> removeImages(Integer id);
	
	ResponseEntity<Publication> changeStatusPublication(Publication p);
	
	boolean deletePublication(Publication p);
	
	List<Publication> getAllActivePublication();
	
	void updatePublication(Integer id, Cursus c);
	
	void deletePublicationCursus(Integer id, Cursus c);
	
	void addCursusToPublication(Integer id, Cursus c);

	List<Publication> getActivatedPublication();

	List<Publication> getRecentPublication();

}
