import { Component, OnInit } from '@angular/core';
import { PublicationService} from '../../publication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private publicationService: PublicationService) { }
  result : any;
  ListPublicationMostVoted  : any;
  Modal : any;
  ModalClient :  any;
  
  ngOnInit() {

    //api pour afficher RecentPublication
    this.publicationService.getRecentPublication().subscribe((res : any) =>
    {
      
      this.result = res;
      this.Modal=res;
      res.forEach(element => {
        this.ModalClient =element.client;
        //console.log(this.ModalClient)
      });
      
      
      console.log(this.result);
      console.log(this.ModalClient)
    })

    //api pour afficher publication most voted
    this.publicationService.getPublicationMostVoted().subscribe((res2 : any) =>
    {
      this.ListPublicationMostVoted = res2;
      console.log(res2);
    })
  }
  onClickReadMore(i){
    this.Modal = this.result[i];
    this.ModalClient = this.result[i].client;
    console.log(this.Modal);
    
  }
  

}
