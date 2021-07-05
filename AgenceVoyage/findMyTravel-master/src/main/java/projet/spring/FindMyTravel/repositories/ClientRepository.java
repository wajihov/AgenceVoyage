package projet.spring.FindMyTravel.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import projet.spring.FindMyTravel.entities.Client;

public interface ClientRepository extends JpaRepository<Client, Integer> {

}
