package projet.spring.FindMyTravel.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projet.spring.FindMyTravel.entities.Company;
import projet.spring.FindMyTravel.services.CompanyService;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/Company")
public class CompanyAPI {

	@Autowired
	CompanyService companyService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PostMapping(value="/addCompany")
	public ResponseEntity<Company> addCompany(@RequestBody Company c){
		String encodedPssword = bCryptPasswordEncoder.encode(c.getPassword());
		c.setPassword(encodedPssword);
		return companyService.addCompany(c);
	}
	
	@GetMapping(value="/getAllCompany")
	public List<Company> getAllCompany(){
		return companyService.findAllCompany();
	}
	
	@GetMapping(value="/getCompany/{id}")
	public ResponseEntity<Company> getOneCompany(@PathVariable("id") Integer id) {
		return companyService.findOneCompany(id);
	}
	@PostMapping(value="/update")
	public ResponseEntity<Company> updateCompany(@RequestBody Company c){
		return companyService.updateCompany(c);
	}
	@GetMapping(value="/delete/{id}")
	public boolean deleteCompany(@PathVariable("id") Integer id){
		return companyService.deleteCompany(id);
	}
}
