package projet.spring.FindMyTravel.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import projet.spring.FindMyTravel.entities.Vote;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Publication {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String address;
	private String description;
	private Long cost;
	private Integer duration;
	private Date createdDate = new Date();
	private Float latitude;
	private Float longitude;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@ManyToOne
	private Client client;
	
	@ManyToMany
	@JoinTable(name="publication_cursus", joinColumns = { @JoinColumn(name = "publication_id")}, inverseJoinColumns = { @JoinColumn(name = "cursus_id")})
	private List<Cursus> ListCursus = new ArrayList<Cursus>();
	
	@OneToMany(mappedBy="publication", fetch = FetchType.LAZY , cascade = CascadeType.ALL, orphanRemoval=true)
	private List<Image> listImage = new ArrayList<Image>();

	
	@OneToMany(mappedBy = "publication", fetch = FetchType.LAZY , cascade = CascadeType.ALL )
	private List<Vote> voteList = new ArrayList<Vote>();
	
	@JsonIgnore
	public List<Vote> getVoteList() {
		return voteList;
	}
	public void setVoteList(List<Vote> voteList) {
		this.voteList = voteList;
	}

	@JsonIgnore
	public List<Cursus> getListCursus() {
		return ListCursus;
	}
	public void setListCursus(List<Cursus> listCursus) {
		ListCursus = listCursus;
	}
	public List<Image> getListImage() {
		return listImage;
	}
	public void setListImage(List<Image> listImage) {
		this.listImage = listImage;
	}
	
	
	public Client getClient() {
		return client;
	}
	public void setClient(Client client) {
		this.client = client;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getCost() {
		return cost;
	}
	public void setCost(Long cost) {
		this.cost = cost;
	}
	public Integer getDuration() {
		return duration;
	}
	public void setDuration(Integer duration) {
		this.duration = duration;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Float getLatitude() {
		return latitude;
	}
	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}
	public Float getLongitude() {
		return longitude;
	}
	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}
	@Override
	public String toString() {
		return "Publication [id=" + id + ", address=" + address + ", description=" + description + ", cost=" + cost
				+ ", duration=" + duration + ", createdDate=" + createdDate + ", latitude=" + latitude + ", longitude="
				+ longitude + ", status=" + status + ", client=" + client
				+ ", listImage=" + listImage + "]";
	}
	
	
}
