package projet.spring.FindMyTravel.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import projet.spring.FindMyTravel.entities.Client;
import projet.spring.FindMyTravel.entities.Company;
import projet.spring.FindMyTravel.filedemo.payload.UploadFileResponse;
import projet.spring.FindMyTravel.services.ClientService;
import projet.spring.FindMyTravel.services.CompanyService;
import projet.spring.FindMyTravel.services.FileStorageService;
import projet.spring.FindMyTravel.services.UserService;

import javax.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
public class UploadApi {


    private static final Logger logger = LoggerFactory.getLogger(UploadApi.class);
//    @Autowired
//    private ImageService imageService;

    @Autowired
    private ClientService clientService;
    @Autowired
    private UserService userService;
    
    @Autowired
    private CompanyService companyService;
    
//    @Autowired
//    private PublicationService publicationService;
//    
    @Autowired
    private FileStorageService fileStorageService;
    
    @PostMapping("/uploadFile/{id}")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("id") Integer id) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();
        userService.updateImage(id, fileName);
        System.out.print("ok  update");

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }
    
    
//    @PostMapping("/uploadFilePub/{id}")
//    public Integer uploadFilePub(@RequestParam("file") MultipartFile file, @PathVariable("id") Integer idPub) {
//        String fileName = fileStorageService.storeFile(file);
//
//        Publication c =publicationService.findOnePublication(idPub).getBody();
//        Image i = new Image();
//        i.setLink("http://localhost:9090/downloadFile/"+fileName);
//        i.setPublication(c);
//       
//        return  imageService.addImage(i).getBody().getId();
//    }
    
    @PostMapping("/uploadImage")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();
        
       
        
        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file))
                .collect(Collectors.toList());
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
