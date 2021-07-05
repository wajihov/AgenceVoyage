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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import projet.spring.FindMyTravel.entities.Company;
import projet.spring.FindMyTravel.entities.Cursus;
import projet.spring.FindMyTravel.entities.Publication;
import projet.spring.FindMyTravel.entities.Status;
import projet.spring.FindMyTravel.services.CompanyService;
import projet.spring.FindMyTravel.services.CursusService;
import projet.spring.FindMyTravel.services.PublicationService;

@CrossOrigin("*")
@RestController
@RequestMapping("/Cursus")
public class CursusAPI {

	@Autowired
	CursusService cursusService;
	
	@Autowired
	PublicationService publicationService;
	
	@Autowired
	CompanyService companyservice;
	
	@PostMapping(value="/addCursus/{companyid}")
	public ResponseEntity<Cursus> addCursus(@RequestBody Cursus c, @PathVariable("companyid") Integer companyid){
		Company company = companyservice.getCompanyById(companyid);
		c.setCompany(company);
		c.setStatus(Status.draft);
		ResponseEntity<Cursus> C1 = cursusService.addCursus(c);
		List<Publication> listPublication = c.getListPublication();
		for(int i=0;i<listPublication.size();i++) {
			publicationService.addCursusToPublication(listPublication.get(i).getId(), c);
		}
		return C1;
		
	}
	
	@GetMapping(value="/getAllCursus")
	public List<Cursus> getAllCursus(){
		return cursusService.findAllCursus();
	}
	@GetMapping(value="/getAllCursus/{id}")
	public List<Cursus> getAllCursusByIdUser(@PathVariable("id") Integer id){
		return cursusService.findAllCursusByIdUser(id);
	}
	
	@GetMapping(value="/getCursus/{id}")
	public ResponseEntity<Cursus> getOneCursus(@PathVariable("id") Integer id){
		return cursusService.findOneCursus(id);
	}
	
	@RequestMapping(value = "/updateCursus/{companyid}/{cursusid}", method = RequestMethod.POST)
	public Cursus UpdateDepartement(@RequestBody Cursus cursus, @PathVariable("cursusid") Integer cursusid, @PathVariable("companyid") Integer companyid) {
		
		Company company = companyservice.getCompanyById(companyid);
		cursus.setCompany(company);
		cursus.setId(cursusid);
    	cursus.setId(cursusid);
    	return cursusService.UpdateCursus(cursus);
	
	}
	@GetMapping(value="/delete/{id}")
	public boolean deleteCursus(@PathVariable("id") Integer id){
		return cursusService.deleteCursus(id);
	}
	
	@GetMapping(value="/getActivatedCursus")
	public ResponseEntity<List<Cursus>> getActivatedPublication(){
		return cursusService.getActivatedCursus();
	}
	
	@PostMapping(value = "/update")
	public ResponseEntity<Cursus> update(@RequestBody Cursus cursus) {
		Cursus lastCursus = cursusService.findOneCursus(cursus.getId()).getBody();
		List<Publication> lastListPublication = lastCursus.getListPublication();
		
		cursus.setCompany(lastCursus.getCompany());
		cursus.setStatus(lastCursus.getStatus());
		ResponseEntity<Cursus> c = cursusService.updateCursus(cursus);
		for(int i=0;i<lastListPublication.size();i++) {
			publicationService.deletePublicationCursus(lastListPublication.get(i).getId(), lastCursus);
		}
		List<Publication> listPublication = cursus.getListPublication();
		for(int i=0;i<listPublication.size();i++) {
			publicationService.updatePublication(listPublication.get(i).getId(), cursus);
		}
    	return c;
	
	}
	
}
