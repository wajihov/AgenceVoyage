package projet.spring.FindMyTravel.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cursus {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String title;
	private String description;
	private Long price;
	private Date departDate;
	private Date returnDate;
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@ManyToOne
	private Company company;
	
	
	@ManyToMany(mappedBy="ListCursus")
	private List<Publication> ListPublication = new ArrayList<Publication>();
	
	
	
	public Cursus(Integer id, String title, String description, Long price, Date departDate, Date returnDate,
			Status status, Company company, List<Publication> listPublication) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.price = price;
		this.departDate = departDate;
		this.returnDate = returnDate;
		this.status = status;
		this.company = company;
		ListPublication = listPublication;
	}
	public Cursus() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	
	
	public List<Publication> getListPublication() {
		return ListPublication;
	}
	public void setListPublication(List<Publication> listPublication) {
		ListPublication = listPublication;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getPrice() {
		return price;
	}
	public void setPrice(Long price) {
		this.price = price;
	}
	public Date getDepartDate() {
		return departDate;
	}
	public void setDepartDate(Date departDate) {
		this.departDate = departDate;
	}
	public Date getReturnDate() {
		return returnDate;
	}
	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	

}
