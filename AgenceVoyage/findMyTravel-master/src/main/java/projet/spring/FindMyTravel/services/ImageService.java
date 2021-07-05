package projet.spring.FindMyTravel.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import projet.spring.FindMyTravel.entities.Image;

public interface ImageService {
	ResponseEntity<Image> addImage(Image i);

	ResponseEntity<Image> findOneImage(Integer id);

	List<Image> findAllImage();
	
	void deleteImage(Integer id);
}
