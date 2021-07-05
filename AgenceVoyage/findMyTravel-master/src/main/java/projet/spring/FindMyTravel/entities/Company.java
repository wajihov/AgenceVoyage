package projet.spring.FindMyTravel.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Company extends User{
	
	private static final long serialVersionUID = 1L;
	private String companyName;
	private String slogan;
	private String address;
	private String city;
	private Integer cP;
	private Integer tel;
	
	@OneToMany(mappedBy="company", fetch = FetchType.LAZY , cascade = CascadeType.ALL)
	private List<Cursus> listCursus = new ArrayList<Cursus>();
	
	@JsonIgnore
	public List<Cursus> getListCursus() {
		return listCursus;
	}
	
	public Company() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Company(String userName, String password, String companyName, String address, String city, Integer cP, Integer tel, String slogan, String image) {
		super(userName, password, image);
		this.companyName=companyName;
		this.address=address;
		this.city=city;
		this.cP=cP;
		this.tel=tel;
		this.slogan=slogan;
		/*this.image=image;*/
		
	}
	public void setListCursus(List<Cursus> listCursus) {
		this.listCursus = listCursus;
	}

	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public Integer getcP() {
		return cP;
	}
	public void setcP(Integer cP) {
		this.cP = cP;
	}
	public Integer getTel() {
		return tel;
	}
	public void setTel(Integer tel) {
		this.tel = tel;
	}

	public String getSlogan() {
		return slogan;
	}

	public void setSlogan(String slogan) {
		this.slogan = slogan;
	}
	
	
	
}
