package projet.spring.FindMyTravel.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import projet.spring.FindMyTravel.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>{


}
