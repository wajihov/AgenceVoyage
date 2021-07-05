import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { UploadService } from 'src/app/upload.service';
import { PublicationService } from 'src/app/publication.service';
import { ImageService } from 'src/app/image.service';
import { ProfileService } from 'src/app/profile.service';

import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listpublication',
  templateUrl: './listpublication.component.html',
  styleUrls: ['./listpublication.component.css']
})

export class ListpublicationComponent implements OnInit {
  
 
  decoded: any;
  userName = '';
  idUser: any;
  ListPublication: any;
  showPublication: any;

  //id Publication for modification
  idPublication: any;

  //all data add
  allDataAdd: any;


  //autocomplete
  searchAddressCtrl = new FormControl("", Validators.required);
  dataPublication = new FormGroup({
    cost: new FormControl("", Validators.required),
    duration: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required)
  });
  filterAddress: any;
  isLoading = false;
  errorMsg: string;

  //add new pub
  textButton = "+ Add";
  show: any;
  links = [];

  uploadForm: FormGroup;
  navigationSubscription;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  title: string = 'Angular File Upload';
  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private uploadService: UploadService,
    private publicationService: PublicationService,
    private imageService: ImageService,
    private profileService: ProfileService,
    private loginService: LoginService) {

    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }

  
  loadPublication() {

    this.showPublication = true;
    this.getAllMyPublication().subscribe(res => {
      this.ListPublication = res;
      console.log(res);
    });
    window.scroll(0,0);
  }

  ngOnInit() {
    
console.log(Date.now())
    this.profileService.get(this.loginService.userName).subscribe((res: any) => {
      console.log(res)
      this.idUser = res.id;
      this.loadPublication();
    });

    this.allDataAdd = {
      address: "",
      description: "",
      cost: 0.0,
      duration: 0,
      latitude: 0.0,
      longitude: 0.0
    }
    this.show = false;
    this.uploadForm = this.fb.group({
      document: [null, null],
      type: [null, Validators.compose([Validators.required])]
    });


  }
  autocomplete(e) {
    //autocomplete
    console.log(e.target.value)
    this.searchAddressCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filterAddress = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get("https://api.opencagedata.com/geocode/v1/json?q=" + e.target.value + "&key=8d3a8ac16e1e46209c21b711e5558e04")
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        this.filterAddress = data.results;
        console.log(data.results)
      });
  }

  showFiles() {
    console.log(this.uploader)
  }
  showNhide() {
    if (this.show == false) {
      this.show = true;
      this.textButton = "- Hide";
    } else {
      this.show = false;
      this.textButton = "+ Add";
    }

  }
  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }
  addpublication(data: Observable<Object>) {
    this.publicationService.addPublication(this.idUser, data).subscribe((res: any) => {
      console.log("this is added publication");
      console.log(res);
      //after add pub add images
      let i=1;
      if (this.links.length > 0) {
        this.links.forEach(element => {
          let dataImage = {
            link: element
          }
          this.imageService.addImage(res.id, dataImage).subscribe(img => console.log(img));
          if (i == this.links.length) {
            this.loadPublication();
  
            this.router.navigated = false;
            this.router.navigate([this.router.url]);
  
          }
          i++;
        });
        
      }
      if (this.links.length == 0) {
        this.loadPublication();

        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      }
    })
  }
  share() {
    //upload images
    let formData = new FormData();
    let files = this.getFiles();
    console.log(files);
    files.forEach((file) => {

      formData.append('files', file.rawFile, file.name);

    });
    this.uploadService.uploadMultiple(formData).subscribe((res: any) => {
      res.forEach(element => {
        this.links.push(element.fileName);
      });
    });



    this.allDataAdd.cost = this.dataPublication.value.cost;
    this.allDataAdd.duration = this.dataPublication.value.duration;
    this.allDataAdd.description = this.dataPublication.value.description;


    this.addpublication(this.allDataAdd);
  }
  lonLat() {
    //get Long lat from address
    this.http.get("https://api.opencagedata.com/geocode/v1/json?q=" + this.searchAddressCtrl.value + "&key=8d3a8ac16e1e46209c21b711e5558e04").subscribe((res: any) => {
      this.allDataAdd.address = res.results[0].formatted;
      this.allDataAdd.latitude = res.results[0].geometry.lat;
      this.allDataAdd.longitude = res.results[0].geometry.lng;
      console.log(res.results[0].formatted);
      console.log(this.allDataAdd.latitude);
      console.log(this.allDataAdd.longitude);

    });
  }
  getAllMyPublication() {
    return this.publicationService.getAllMyPublication(this.idUser);
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }
  modifyPublication(publication) {
    window.scroll(0,0);
    this.imageService.deleteImage(publication.id).subscribe(res => { console.log(res) });
    this.links = [];
    this.idPublication = publication.id;
    console.log(this.idPublication)
    console.log(publication)
    this.searchAddressCtrl.patchValue(publication.address);
    
    this.dataPublication.patchValue({ description: publication.description, cost: publication.cost, duration: publication.duration });
    console.log(this.dataPublication.value)
    publication.listImage.forEach(element => {
      this.http.get("http://localhost:9091/downloadFile/" + element.link, { responseType: "blob" }).subscribe(res => {
        console.log(res);
        let file = this.blobToFile(res, element.link);
        let fileItem = new FileItem(this.uploader, file, {});
        this.uploader.queue.push(fileItem);
      })

    });
    this.showPublication = false;
  }

  edit(data: Observable<Object>, idPublication) {

    this.publicationService.editPublication(idPublication, data).subscribe((res: any) => {
      console.log("this is modified publication");
      console.log(res);

      //after edit pub update images
      if (this.links.length > 0) {
        let i = 1;
        this.links.forEach(element => {
          let dataImage = {
            link: element
          }
          this.imageService.addImage(res.id, dataImage).subscribe(img => {console.log(img)
            if (i == this.links.length) {
              this.loadPublication();
  
              this.router.navigated = false;
              this.router.navigate([this.router.url]);
  
            }
            i++;
          });
          
          console.log(i)
          console.log(this.links.length)
          
        });

      }
      if (this.links.length == 0) {
        this.loadPublication();

        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      }
    })
  }

  editPublication() {
    let formData = new FormData();
    let files = this.getFiles();
    console.log(files);
    files.forEach((file) => {

      formData.append('files', file.rawFile, file.name);

    });
    this.uploadService.uploadMultiple(formData).subscribe((res: any) => {
      res.forEach(element => {
        this.links.push(element.fileName);
      });
    });

    
    this.http.get("https://api.opencagedata.com/geocode/v1/json?q=" + this.searchAddressCtrl.value + "&key=8d3a8ac16e1e46209c21b711e5558e04").subscribe((res: any) => {
      this.allDataAdd.address = res.results[0].formatted;
      this.allDataAdd.latitude = res.results[0].geometry.lat;
      this.allDataAdd.longitude = res.results[0].geometry.lng;
      console.log(res.results[0].formatted);

      this.allDataAdd.cost = this.dataPublication.value.cost;
    this.allDataAdd.duration = this.dataPublication.value.duration;
    this.allDataAdd.description = this.dataPublication.value.description;


    this.edit(this.allDataAdd, this.idPublication);
    });

  }
  changeStatus(publication){
    this.publicationService.changeStatus(publication).subscribe(res=>{
      console.log(res);

    });
    
  }
  showSwal(publication){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.publicationService.deletePublication(publication).subscribe((res: any)=>{
          if(res){
            this.loadPublication();
            Swal.fire(
              'Deleted!',
              'Your publication has been deleted.',
              'success'
            )
            
          }else{
            Swal.fire(
              'Error!',
              'Error Deleting',
              'error'
            )
          }
        });
      }
      
      
    })
  }
  
}
