package projet.spring.FindMyTravel.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projet.spring.FindMyTravel.entities.Image;
import projet.spring.FindMyTravel.services.ImageService;
import projet.spring.FindMyTravel.services.PublicationService;

@CrossOrigin("*")
@RestController
@RequestMapping("/Image")
public class ImageAPI {
	@Autowired
	ImageService imageService;
	@Autowired
	PublicationService publicationService;
	
	@PostMapping(value="/addImage/{id}")
	public ResponseEntity<Image> addImage(@RequestBody Image i, @PathVariable("id") Integer id) {
		i.setPublication(publicationService.findOnePublication(id).getBody());
		return imageService.addImage(i);
	}
	
	@GetMapping(value="/getAllImage")
	public List<Image> getAllImage(){
		return imageService.findAllImage();
	}
	
	@GetMapping(value="/getImage/{id}")
	public ResponseEntity<Image> getOneImage(@PathVariable("id") Integer id){
		return imageService.findOneImage(id);
	}
	@PostMapping(value="/deleteImage/{id}")
	public void deleteImage(@PathVariable("id") Integer id) {
		imageService.deleteImage(id);
	}
}
