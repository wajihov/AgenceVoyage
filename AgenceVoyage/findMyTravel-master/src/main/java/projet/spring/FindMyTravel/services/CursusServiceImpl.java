package projet.spring.FindMyTravel.services;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import projet.spring.FindMyTravel.entities.Cursus;
import projet.spring.FindMyTravel.entities.Status;
import projet.spring.FindMyTravel.repositories.CursusRepository;

@Service("cursusService")
public class CursusServiceImpl implements CursusService{

	@Autowired
	EntityManager em;
	@Autowired
	CursusRepository cr;
	
	@Transactional
	@Override
	public ResponseEntity<Cursus> addCursus(Cursus c) {
		c.setStatus(Status.activated);
		
		em.persist(c);
		return ResponseEntity.ok().body(c);
	}

	@Transactional
	@Override
	public ResponseEntity<Cursus> findOneCursus(Integer id) {
		Cursus c = em.find(Cursus.class, id);
		if(c==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(c);
	}

	@Override
	public List<Cursus> findAllCursus() {
		
		List<Cursus> listCursus = new ArrayList<Cursus>(cr.findAll(Sort.by(Sort.Direction.DESC, "id")));
		return listCursus;
		
	}
	@Transactional
	@Override
	public Cursus UpdateCursus(Cursus cursus) {
		return em.merge(cursus);
		
	}


	@Transactional
	@Override
	public List<Cursus> findAllCursusByIdUser(Integer id) {
		TypedQuery<Cursus> query = (TypedQuery<Cursus>) em.createQuery("SELECT c FROM Cursus c WHERE c.status not like 'deleted' and c.company.id = :id  order by c.id desc" ,Cursus.class);
		List<Cursus> listCursus = query.setParameter("id", id).getResultList();
		return listCursus;
	}

	@Override
	public ResponseEntity<List<Cursus>> getActivatedCursus(){
		TypedQuery<Cursus> query = (TypedQuery<Cursus>) em.createQuery("SELECT c FROM Cursus c WHERE c.status = :activated" ,Cursus.class);
		List<Cursus> ListCursus = query.setParameter("activated", Status.activated).getResultList();
		
		return ResponseEntity.ok().body(ListCursus);
	}
	
	@Transactional
	@Override
	public boolean deleteCursus(Integer id) {
		Cursus c = em.find(Cursus.class, id);
		c.setStatus(Status.deleted);
		em.merge(c);
		if (c.getStatus().equals(Status.deleted)){
			return true;
		}
		return false;
	}
	
	@Transactional
	@Override
	public ResponseEntity<Cursus> updateCursus(Cursus c){
		em.merge(c);
		return ResponseEntity.ok().body(c);
	}
	
	//every midnight update disable Cursus with departure date > date now
	@Transactional
	@Scheduled(cron="0 0 12 * * ?")
	public void updateStatusCursus() {
		List<Cursus> listC = cr.findAll();
		Date date = new Date();
		for(int i=0;i<listC.size();i++) {
			if(listC.get(i).getDepartDate().compareTo(date)<0) {
				Cursus c = listC.get(i);
				c.setStatus(Status.deleted);
				em.merge(c);
				System.out.print("yes update"+ c.getId());
			}
		}
		
	}
	

	
}
