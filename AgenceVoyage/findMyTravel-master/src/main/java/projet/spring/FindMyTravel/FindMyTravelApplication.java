package projet.spring.FindMyTravel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import projet.spring.FindMyTravel.filedemo.property.FileStorageProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class FindMyTravelApplication {

	public static void main(String[] args) {
		SpringApplication.run(FindMyTravelApplication.class, args);
	}

}
