package projet.spring.FindMyTravel.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import projet.spring.FindMyTravel.entities.Vote;

public interface VoteRepository extends JpaRepository<Vote, Integer>{

}
