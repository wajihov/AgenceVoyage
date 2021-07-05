package projet.spring.FindMyTravel.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.boot.jackson.JsonObjectSerializer;
import org.springframework.boot.json.JsonParser;
import org.springframework.stereotype.Service;

import projet.spring.FindMyTravel.entities.Client;
import projet.spring.FindMyTravel.entities.Company;
import projet.spring.FindMyTravel.entities.Cursus;
import projet.spring.FindMyTravel.entities.Publication;
import projet.spring.FindMyTravel.entities.Status;

@Service("statistiqueService")
public class StatistiqueServiceImpl implements StatistiqueService{

	@Autowired
	ClientService clientService;
	
	@Autowired
	CompanyService companyService;
	
	@Autowired
	PublicationService publicationService;
	
	@Autowired
	CursusService cursusService;
	
	
	
	@Override
	public String getAllStat() {
		List<Client> listClient = clientService.findAllClient();
		List<Company> listCompany = companyService.findAllCompany();
		List<Publication> listPub = publicationService.findAllPublication();
		List<Cursus> listCursus = cursusService.findAllCursus();
		
		JSONObject stat = new JSONObject();
		
		JSONObject clientStat = new JSONObject();
		JSONObject companyStat = new JSONObject();
		JSONObject publicationStat = new JSONObject();
		JSONObject cursusStat = new JSONObject();
		try {
			clientStat.put("active", listClient.stream().filter(item->item.getStatus().equals(Status.activated)).count());
			clientStat.put("deleted",listClient.stream().filter(item->item.getStatus().equals(Status.deleted)).count());
			stat.put("clientStat", clientStat);
			
			companyStat.put("active", listCompany.stream().filter(item->item.getStatus().equals(Status.activated)).count());
			companyStat.put("deleted",listClient.stream().filter(item->item.getStatus().equals(Status.deleted)).count());
			stat.put("companyStat", companyStat);
			
			publicationStat.put("active", listPub.stream().filter(item->item.getStatus().equals(Status.activated)).count());
			publicationStat.put("draft",listPub.stream().filter(item->item.getStatus().equals(Status.draft)).count());
			publicationStat.put("deleted",listPub.stream().filter(item->item.getStatus().equals(Status.deleted)).count());
			stat.put("publicationStat", publicationStat);
			
			cursusStat.put("active", listCursus.stream().filter(item->item.getStatus().equals(Status.activated)).count());
			cursusStat.put("draft",listCursus.stream().filter(item->item.getStatus().equals(Status.draft)) .count());
			cursusStat.put("deleted",listCursus.stream().filter(item->item.getStatus().equals(Status.deleted)).count());
			stat.put("cursusStat", cursusStat);
			
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return stat.toString();
	}

	
}
