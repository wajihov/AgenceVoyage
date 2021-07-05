package projet.spring.FindMyTravel.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import projet.spring.FindMyTravel.entities.Vote;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Client extends User{

	private static final long serialVersionUID = 1L;
	private String firstName;
	private String lastName;
	/*private String image;*/
	private String statut;
	
	@Temporal(TemporalType.DATE)
	private Date birthday;
	
	@OneToMany(mappedBy = "client", fetch = FetchType.LAZY , cascade = CascadeType.ALL)
	private List<Publication> ListPublication = new ArrayList<Publication>();
	
	@OneToMany(mappedBy = "client", fetch = FetchType.LAZY , cascade = CascadeType.ALL )
	@JsonIgnore
	private List<Vote> voteList = new ArrayList<Vote>();
	
	public List<Vote> getVoteList() {
		return voteList;
	}
	public void setVoteList(List<Vote> voteList) {
		this.voteList = voteList;
	}
	public Client() {
		super();
	}
	public Client(String userName, String password, String firstName, String image, String lastName, String statut) {
	
		super(userName, password, image);
		this.firstName=firstName;
		this.lastName=lastName;
		this.statut=statut;
	}

	
	@JsonIgnore
	public List<Publication> getListPublication() {
		return ListPublication;
	}
	public void setListPublication(List<Publication> listPublication) {
		ListPublication = listPublication;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	
	public String getStatut() {
		return statut;
	}
	public void setStatut(String statut) {
		this.statut = statut;
	}
	

}
