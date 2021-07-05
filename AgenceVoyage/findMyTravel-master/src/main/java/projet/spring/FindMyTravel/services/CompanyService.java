package projet.spring.FindMyTravel.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import projet.spring.FindMyTravel.entities.Company;

public interface CompanyService {

	ResponseEntity<Company> addCompany(Company c);

	ResponseEntity<Company> findOneCompany(Integer id);

	List<Company> findAllCompany();
	
	Company getCompanyById(Integer id);
	
	/*ResponseEntity<Company> updateImage(Integer id, String fileName);*/
	
	ResponseEntity<Company> updateCompany(Company c);

	boolean deleteCompany(Integer id);

}
