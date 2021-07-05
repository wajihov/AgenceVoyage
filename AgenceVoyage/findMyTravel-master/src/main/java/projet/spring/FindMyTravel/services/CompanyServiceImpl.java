package projet.spring.FindMyTravel.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import projet.spring.FindMyTravel.entities.Client;
import projet.spring.FindMyTravel.entities.Company;
import projet.spring.FindMyTravel.entities.Role;
import projet.spring.FindMyTravel.entities.Status;
import projet.spring.FindMyTravel.repositories.CompanyRepository;

@Service("companyService")
public class CompanyServiceImpl implements CompanyService{

	@Autowired
	EntityManager em;
	
	@Autowired
	CompanyRepository cr;
	
	@Transactional
	@Override
	public ResponseEntity<Company> addCompany(Company c) {
		c.setImage("home.png");
		c.setRole(Role.company);
		c.setStatus(Status.activated);
		em.persist(c);
		return new ResponseEntity<Company>(c,HttpStatus.CREATED);
	}
	
	@Transactional
	@Override
	public ResponseEntity<Company> findOneCompany(Integer id) {
		Company c = em.find(Company.class, id);
		if(c==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(c);
	}
	@Override
	public List<Company> findAllCompany() {
		List<Company> listCompany = new ArrayList<Company>(cr.findAll());
		return listCompany;
	}

	@Override
	public Company getCompanyById(Integer id) {
		return cr.getOne(id);
	}
	
	/*@Transactional 
	@Override
	public ResponseEntity<Company> updateImage(Integer id, String fileName){
		Company c=em.find(Company.class, id);
		c.setImage(fileName);
		em.merge(c);
		return ResponseEntity.ok().body(c);
	}*/
	@Transactional 
	@Override
	public ResponseEntity<Company> updateCompany(Company c){
		Company cUpdated=em.find(Company.class, c.getId());
		cUpdated.setCompanyName(c.getCompanyName());
		cUpdated.setSlogan(c.getSlogan());
		cUpdated.setAddress(c.getAddress());
		cUpdated.setcP(c.getcP());
		cUpdated.setCity(c.getCity());
		cUpdated.setTel(c.getTel());
		em.merge(cUpdated);
		return ResponseEntity.ok().body(cUpdated);
	}

	@Transactional
	@Override
	public boolean deleteCompany(Integer id) {
		Company c = em.find(Company.class, id);
		c.setStatus(Status.deleted);
		em.merge(c);
		if (c.getStatus().equals(Status.deleted)){
			return true;
		}
		return false;
	}
	
}
