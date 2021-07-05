package projet.spring.FindMyTravel.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import projet.spring.FindMyTravel.entities.Cursus;
import projet.spring.FindMyTravel.entities.Image;
import projet.spring.FindMyTravel.entities.Publication;
import projet.spring.FindMyTravel.entities.Status;
import projet.spring.FindMyTravel.repositories.PublicationRepository;

@Service("pubService")
public class PublicationServiceImpl implements PublicationService{
	

	@Autowired
	EntityManager em;
	@Autowired
	PublicationRepository pr;

	@Transactional
	@Override
	public ResponseEntity<Publication> addPublication(Publication p) {
		p.setStatus(Status.draft);
		System.out.print(p);
		em.persist(p);
		return ResponseEntity.ok().body(p);
	}

	@Transactional
	@Override
	public ResponseEntity<Publication> findOnePublication(Integer id) {
		Publication p = em.find(Publication.class, id);
		if(p==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(p);
	}
	
	@Transactional
	@Override
	public List<Publication> findAllPublicationById(Integer id){
		TypedQuery<Publication> query = (TypedQuery<Publication>) em.createQuery("SELECT p FROM Publication p WHERE p.client.id = :id and p.status not like 'deleted' order by p.id desc" ,Publication.class);
		List<Publication> ListP = query.setParameter("id", id).getResultList();
		
		return ListP;
	}

	@Override
	public List<Publication> findAllPublication() {
		List<Publication> listPub = new ArrayList<Publication>(pr.findAll());
		return listPub;
	}
	@Transactional
	@Override
	public ResponseEntity<Publication> editPublication(Publication p, Integer id){
		Publication fP = em.find(Publication.class, id);
		fP.setCost(p.getCost());
		fP.setAddress(p.getAddress());
		fP.setDescription(p.getDescription());
		fP.setDuration(p.getDuration());
		fP.setLongitude(p.getLongitude());
		fP.setLatitude(p.getLatitude());
		Publication pUpdated =em.merge(fP);
		return ResponseEntity.ok().body(pUpdated);
	}
	@Transactional
	@Override
	public ResponseEntity<Publication> changeStatusPublication(Publication p){
		Publication pUpdated = new Publication();
		Publication pf=em.find(Publication.class, p.getId());
		if(pf.getStatus().equals(Status.draft)) {
			pf.setStatus(Status.activated);
		}
		else if(pf.getStatus().equals(Status.activated)) {
			pf.setStatus(Status.draft);
		}
		pUpdated=em.merge(pf);
		return ResponseEntity.ok().body(pUpdated);
	}
	
	@Transactional
	@Override
	public ResponseEntity<Publication> removeImages(Integer id) {
		Publication p = em.find(Publication.class, id);
		List<Image> list = p.getListImage();
		p.getListImage().removeAll(list);
		Publication pUpdated = em.merge(p);
		return ResponseEntity.ok().body(pUpdated);
	}
	@Transactional
	@Override
	public boolean deletePublication(Publication p){
		Publication pUpdated = new Publication();
		Publication pf=em.find(Publication.class, p.getId());
		pf.setStatus(Status.deleted);
		pUpdated=em.merge(pf);
		if(pUpdated.getStatus().equals(Status.deleted)) {
			return true;
		}
		return false;
	}
	
	@Transactional
	@Override
	public List<Publication> getAllActivePublication(){
		TypedQuery<Publication> query = (TypedQuery<Publication>) em.createQuery("SELECT p FROM Publication p WHERE  p.status like 'activated' order by p.id desc" ,Publication.class);
		List<Publication> ListP = query.getResultList();
		
		return ListP;
	}
	@Transactional
	@Override
	public void addCursusToPublication(Integer id, Cursus c){
		Publication p=em.find(Publication.class, id);
		List<Cursus> listC = p.getListCursus();
		listC.add(c);
		p.setListCursus(listC);
		em.merge(p);
	}
	@Transactional
	@Override
	public void updatePublication(Integer id, Cursus c){
		Publication p=em.find(Publication.class, id);
		List<Cursus> listC = p.getListCursus();
		boolean find=false;
		for(int i=0;i<listC.size();i++) {
			if(listC.get(i).equals(c)) {
				find=true;
			}
		}
		if(!find) {
			listC.add(c);
		}
		p.setListCursus(listC);
		em.merge(p);
	}
	@Transactional
	@Override
	public void deletePublicationCursus(Integer id, Cursus c){
		Publication p=em.find(Publication.class, id);
		List<Cursus> listC = p.getListCursus();
		for(int i=0;i<listC.size();i++) {
			if(listC.get(i).equals(c)) {
				listC.remove(c);
			}
		}
		p.setListCursus(listC);
		em.merge(p);
	}
	
	@Transactional
	@Override
	public List<Publication> getActivatedPublication(){
		TypedQuery<Publication> query = (TypedQuery<Publication>) em.createQuery("SELECT p FROM Publication p WHERE p.status = :activated order by p.id desc" ,Publication.class);
		List<Publication> ListP = query.setParameter("activated", Status.activated).getResultList();
		
		return ListP;
	}
	
	@Transactional
	@Override
	public List<Publication> getRecentPublication(){
		TypedQuery<Publication> query = (TypedQuery<Publication>) em.createQuery("SELECT p FROM Publication p  WHERE p.status = :activated ORDER BY id DESC");
		List<Publication> ListP = query.setParameter("activated", Status.activated).setMaxResults(4).getResultList();
		
		return ListP;
	}
}
