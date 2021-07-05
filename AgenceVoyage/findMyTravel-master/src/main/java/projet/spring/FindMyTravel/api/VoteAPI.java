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

import projet.spring.FindMyTravel.entities.Vote;
import projet.spring.FindMyTravel.services.VoteService;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/Vote")
public class VoteAPI {
	
	@Autowired
	VoteService voteService;
	
	@PostMapping(value="/votePublication/{clientId}/{publicationId}")
	public ResponseEntity votePublication(@RequestBody Vote vote, @PathVariable("clientId") Integer clientId, @PathVariable("publicationId") Integer publicationId){
		
		return voteService.votePublication(vote, clientId, publicationId);
		
	}
	@GetMapping(value="/getListVote/{clientId}")
	public List<Vote> getListVote(@PathVariable("clientId") Integer clientId){
		return voteService.getVoteList(clientId);
		
	}
	
	@GetMapping(value="/countVote/{publicationId}")
	public List<Vote> countVote(@PathVariable("publicationId") Integer publicationId) {
		return voteService.countVote(publicationId);
	}
	
	@GetMapping(value="/getPublicationMostVoted")
	public List<Vote> getPublicationMostVoted(){
		return voteService.getPublicationMostVoted();
	}

}
