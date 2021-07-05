package projet.spring.FindMyTravel.services;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import projet.spring.FindMyTravel.entities.Client;
import projet.spring.FindMyTravel.entities.Publication;
import projet.spring.FindMyTravel.entities.Vote;
import projet.spring.FindMyTravel.repositories.ClientRepository;
import projet.spring.FindMyTravel.repositories.PublicationRepository;
import projet.spring.FindMyTravel.repositories.VoteRepository;

@Service("voteService")
public class VoteServiceImpl implements VoteService{
	@PersistenceContext
	EntityManager em;
	
	@Autowired
	VoteRepository voteRepository;
	@Autowired
	ClientRepository clientRepository;
	@Autowired
	PublicationRepository publicationRepository;

	private Date firstDate;

	private Date lastDate;
	
	@Transactional
	@Override
	public ResponseEntity<?> votePublication(Vote vote, Integer ClientId, Integer PublicationId) {
		
		TypedQuery<Vote> query = (TypedQuery<Vote>) em.createQuery("SELECT v FROM Vote v WHERE v.client.id = :client_id AND v.publication.id = :publication_id", Vote.class);
		List<Vote> Listvote =query.setParameter("client_id", ClientId).setParameter("publication_id", PublicationId).getResultList();
		if(Listvote.isEmpty()) {
			
			Client c = clientRepository.getOne(ClientId);
			Publication p = publicationRepository.getOne(PublicationId);
			vote.setClient(c);
			vote.setPublication(p);
			em.persist(vote);
			return ResponseEntity.ok(vote);
		}
		else {
			
			voteRepository.deleteAll(Listvote);
			return null;
		}

	}
	
	@Override
	public List<Vote> getVoteList(Integer clientId)
	{
		TypedQuery<Vote> query = (TypedQuery<Vote>) em.createQuery("SELECT v.publication.id FROM Vote v WHERE v.client.id = :client_id");
		List<Vote> Listvote = query.setParameter("client_id", clientId).getResultList();
		return Listvote;
		
	}
	@Override
	public List<Vote> countVote(Integer publicationId) {
		
		TypedQuery<Vote> query = (TypedQuery<Vote>) em.createQuery("SELECT COUNT (v) FROM Vote v WHERE v.publication.id = :publication_id");
		List<Vote> count = query.setParameter("publication_id", publicationId).getResultList();
		return count;
		
	}
	
	@Override
	public List<Vote> getPublicationMostVoted(){
		
		@SuppressWarnings("deprecation")
		int month =  new Date().getMonth()-1;
		if(new Date().getMonth() == 0) {
			int year = new Date().getYear()-1;
			this.firstDate = new Date(year, 12, 1);
			this.lastDate = new Date(year, 12, 31);
		}
		else {
			int year = new Date().getYear();
			this.firstDate = new Date(year, month, 1);
			this.lastDate = new Date(year, month, 31);
			System.out.println(month);
			System.out.println(lastDate);
			System.out.println(firstDate);
		}


		TypedQuery<Vote> query = (TypedQuery<Vote>) em.createQuery("SELECT v, COUNT (v) AS count FROM Vote v INNER JOIN Publication p ON p.id = v.publication.id "
				+ "WHERE p.createdDate >= :firstDate AND p.createdDate <= : lastDate "
				+ "GROUP BY v.publication.id ORDER BY COUNT (v) DESC") ;
		
		List<Vote> ListPublication = query.setParameter("firstDate", firstDate).setParameter("lastDate", lastDate).setMaxResults(3).getResultList();
		return ListPublication;
		
	}
}
