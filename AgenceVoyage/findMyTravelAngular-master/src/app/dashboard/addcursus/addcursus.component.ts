import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/profile.service';
import { LoginService } from 'src/app/login.service';
import { PublicationService } from 'src/app/publication.service';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CursusService } from 'src/app/cursus.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-addcursus',
  templateUrl: './addcursus.component.html',
  styleUrls: ['./addcursus.component.css']
})
export class AddcursusComponent implements OnInit, DoCheck {

  idUser;
  filterText;
  listActivePublication: any;
  listPublicationSelected = [];
  isEmpty = true;

  dataCursus = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    price: new FormControl(0, Validators.required),
    departDate: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Validators.required),
    returnDate: new FormControl(Validators.required)
  });


  constructor(private router: Router,
    private profileService: ProfileService,
    private loginService: LoginService,
    private publicationService: PublicationService,
    private cursusService: CursusService) { }

  ngDoCheck() {
    console.log("change")
    this.checkEmpty();
  }
  ngOnInit() {
    this.profileService.get(this.loginService.userName).subscribe((res: any) => {
      this.idUser = res.id;
    });

    this.publicationService.getAllActivePublication().subscribe((res: any) => {
      this.listActivePublication = res;
      console.log(res)
    })
    this.dataCursus.setValue({ departDate: Date.now() })
  }

 
  checkEmpty() {
    if (this.listPublicationSelected.length > 0) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    console.log(this.isEmpty)
  }

  selected(publication) {
    this.checkEmpty();
    if (this.listPublicationSelected.includes(publication)) {
      console.log("true")
      return true;
    } else {
      console.log("false")
      return false;
    }

  }

  getMyStyles(publication) {
    let myStyles = {
      'border': this.selected(publication) ? 'blue solid 2px' : 'none',
      'box-shadow': this.selected(publication) ? '0 4px 8px 0 rgba(47, 0, 255, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' : 'none'

    };
    return myStyles;
  }



  selection(publication) {
    let find = false;
    let index = -1;
    this.listPublicationSelected.forEach(element => {
      index++;
      if (element == publication) {
        find = true;
        this.listPublicationSelected.splice(index, 1);
      }
    });
    if (find == false) {
      this.listPublicationSelected.push(publication);
    }
    console.log(this.listPublicationSelected)
  }

  share() {
    const obj = this.dataCursus.value;
    obj['listPublication'] = this.listPublicationSelected;
    // console.log(this.dataCursus.value)
    console.log(obj)
    this.cursusService.addCursus(this.idUser, obj).subscribe((res: any) => {
      console.log(res)
      Swal.fire({
        title: 'Success',
        text: "Publication added!",
        type: 'success'
      }).then((result) => {
        if (result.value) {
          this.publicationService.getAllActivePublication().subscribe((res: any) => {
            this.listActivePublication = res;
            console.log(res)
          })
          this.listPublicationSelected=[];
          this.dataCursus.setValue({ 
            title:"",
            description:"",
            price:0,
            departDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
            returnDate: 'yyyy-MM-dd'
           })
        }
      });
    })
  }
}


