import { Component, OnInit, DoCheck } from '@angular/core';
import { CursusService } from 'src/app/cursus.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { ProfileService } from 'src/app/profile.service';
import Swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { PublicationService } from 'src/app/publication.service';

@Component({
  selector: 'app-list-cursus',
  templateUrl: './list-cursus.component.html',
  styleUrls: ['./list-cursus.component.css']
})
export class ListCursusComponent implements OnInit, DoCheck {

  listActivePublication=[];
  listPublicationSelected=[];
  idUser;
  modifCard:any;
  filterText;
  isEmpty = true;

  constructor(
    private router: Router,
    private cursusService: CursusService,
    private loginService: LoginService,
    private profileService: ProfileService,
    private publicationService: PublicationService
  ) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }
   listCursus;
   dataCursus = new FormGroup({
     id:new FormControl(),
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    price: new FormControl(0, Validators.required),
    departDate: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Validators.required),
    returnDate: new FormControl(Validators.required)
  });

  ngOnInit() {
    this.modifCard=false;
    this.profileService.get(this.loginService.userName).subscribe((res: any) => {
      console.log(res)
      this.idUser = res.id;
      this.cursusService.getAllCursus(this.idUser).subscribe((res:any)=>{
        console.log(res)
        this.listCursus=res;
      })
    });
  }
  showSwal(cursus){
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
        this.cursusService.deleteCursus(cursus).subscribe((res: any)=>{
          if(res){

            Swal.fire(
              'Deleted!',
              'Your cursus has been deleted.',
              'success'
            );
            this.router.navigated = false;
            this.router.navigate([this.router.url]);
      
            
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
  ngDoCheck() {
    console.log("change")
    this.checkEmpty();
  }
  
  checkEmpty() {
    if (this.listPublicationSelected.length > 0) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    console.log(this.isEmpty)
  }

  filterAll(){
    this.filterText="";
  }
  filterActive(){
    this.filterText="active";
  }
  filterDraft(){
    this.filterText="draft";
  }
  
  selected(publication) {
    let find=false;
    this.checkEmpty();
    this.listPublicationSelected.forEach(elem=>{
      if (elem.id==publication.id){
        find=true;
      }
    })
   return find;

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
      if (element.id == publication.id) {
        find = true;
        this.listPublicationSelected.splice(index, 1);
      }
    });
    if (find == false) {
      this.listPublicationSelected.push(publication);
    }
    console.log(this.listPublicationSelected)
  }
  modifCursus(cursus){
    this.dataCursus.setValue({
      id:cursus.id,
      title: cursus.title,
      description: cursus.description,
      price:cursus.price,
      departDate: formatDate(cursus.departDate, 'yyyy-MM-dd', 'en-US'),
      returnDate: formatDate(cursus.returnDate, 'yyyy-MM-dd', 'en-US')
    });
    
    cursus.listPublication.forEach(element => {
      this.listPublicationSelected.push(element)
    });
    console.log(this.listPublicationSelected)
    this.publicationService.getAllActivePublication().subscribe((res: any) => {
      let index=0;
      res.forEach(element => {
        this.listActivePublication.push(element)
        console.log(this.getMyStyles(element))
        index++;
      });
      if(index==res.length){
        this.checkEmpty();
        this.modifCard=true;

      }
    })
    
    
  }
  edit(){

    const obj = this.dataCursus.value;
    obj['listPublication'] = this.listPublicationSelected;
    // console.log(this.dataCursus.value)
    console.log(obj)
    this.cursusService.editCursus(obj).subscribe((res: any) => {
      console.log(res)
      Swal.fire({
        title: 'Success',
        text: "Publication modified!",
        type: 'success'
      }).then((result) => {
        if (result.value) {
          this.router.navigated = false;
            this.router.navigate([this.router.url]);
        }
      });
    })
  }

}
