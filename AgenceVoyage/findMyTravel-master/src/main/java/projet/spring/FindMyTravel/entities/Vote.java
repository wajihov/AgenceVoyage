package projet.spring.FindMyTravel.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import projet.spring.FindMyTravel.entities.Client;
import projet.spring.FindMyTravel.entities.Publication;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Vote {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@NotNull
	@ManyToOne 
	private Client client ;
	
	@NotNull
	@ManyToOne 
	private Publication publication ;

	public Publication getPublication() {
		return publication;
	}

	public void setPublication(Publication publication) {
		this.publication = publication;
	}

	public Vote() {
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client c) {
		client = c;
	}
}
