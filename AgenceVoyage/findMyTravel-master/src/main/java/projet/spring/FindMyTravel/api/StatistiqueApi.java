package projet.spring.FindMyTravel.api;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projet.spring.FindMyTravel.services.StatistiqueService;

@CrossOrigin("*")
@RestController
@RequestMapping("/Statistique")
public class StatistiqueApi {
	
	@Autowired
	StatistiqueService statistiqueService;
	
	@GetMapping(value="/getAll")
	public String  getStat() {
		return statistiqueService.getAllStat();
	}

}
