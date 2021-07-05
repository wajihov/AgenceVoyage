import { Component, OnInit } from '@angular/core';
import { CursusService} from '../../cursus.service';
import { SearchCompanyPipe } from '../../search-company.pipe'



@Component({
  selector: 'app-cursus',
  templateUrl: './cursus.component.html',
  styleUrls: ['./cursus.component.css']
})
export class CursusComponent implements OnInit {
  filterResult : any;
  Modal : any;
  result : any;
  addressSearch: any;
  costSearchMin: any;
  costSearchMax: any;
  depatDateSearch: Date;
  returnDateSearch: any;
  ModalCompany :  any;
  
  jsonObject = { destination: '', minPrice: null, maxPrice: null, departDate: null, returnDate:null };

  constructor(private cursusService:CursusService) { }

  ngOnInit() {
    this.cursusService.getActivatedCursus().subscribe((res:any)=>{
      console.log(res);
      this.result = res;
      this.filterResult = res;
      this.Modal = res;
      res.forEach(element => {
        this.ModalCompany = element.client;
        //console.log(this.ModalClient)
      });
      
       //remplir toutes les images dans une seule liste
        this.filterResult.forEach(element =>{
          element['oneListImages'] = [];
          element.listPublication.forEach(i =>{
            i.listImage.forEach(j=>{
              
              element['oneListImages'].push(j.link)
              
            })
           
            
          })
        })
      
      console.log(this.filterResult)
      this.Modal=res;
      
    })
  }
  onClickCompanyContact(i){
    this.Modal = this.filterResult[i];
    this.ModalCompany = this.result[i].company;
    //console.log(this.Modal);
    
  }
  filterList(key, value) {
    this.jsonObject[key] = value;
    console.log(this.jsonObject)
    const p = new SearchCompanyPipe();
    this.filterResult = p.transform(this.result, this.jsonObject)
  }

}
