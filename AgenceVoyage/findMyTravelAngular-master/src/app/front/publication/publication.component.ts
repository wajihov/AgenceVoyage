import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../publication.service';
import { SearchPipe } from 'src/app/search.pipe';
import { ProfileService } from 'src/app/profile.service';
import * as jwt_decode from "jwt-decode";
import {  AuthGuardService as AuthGuard } from '../../auth-guard.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {


  jsonObject = { destination: '', minPrice: null, maxPrice: null, duration: null };
  result: any;
  filterResult: any;
  publication: any;
  addressSearch: any;
  costSearchMin: any;
  costSearchMax: any;
  durationSearch: any;
  clientId: any;
  listeVote: any = [];
  active : any;
  isOpened: any;
  role : any;


  constructor(private authGuard:AuthGuard, private publicationService: PublicationService, private profileService: ProfileService) { }

  ngOnInit() {
    //variable active pour tester authentification
    this.active= this.authGuard.activate();
    //get clientId by userName by token
    if (localStorage.getItem('token')) {
      let decodedToken = localStorage.getItem('token');
      let userName = jwt_decode(decodedToken)['sub'];
      this.profileService.get(userName).subscribe((res: any) => {
        this.role = res.role;
        this.clientId = res.id;
        console.log(this.role);
        //get ListeVote by clientId
        this.publicationService.getListVote(this.clientId).subscribe((res2: any) => {
          this.listeVote = res2;
        });
      });
    }


    //get ActivatedPublication
    this.publicationService.getActivatedPublication().subscribe((res: any) => {

      console.log(res)
      this.result = res;
      this.filterResult = res;

      //countVote by publicationId
      this.filterResult.forEach(element => {
        //console.log(element)
        this.publicationService.countVote(element['id']).subscribe((res3: any) => {
          //inclure count dans tableau filterResult
          element['count'] = res3
          //console.log(element)

        })

      })

    });

  }


  filterList(key, value) {
    this.jsonObject[key] = value;
    console.log(this.jsonObject)
    const p = new SearchPipe();
    this.filterResult = p.transform(this.result, this.jsonObject)
  }

  onClickVote(item) {
    if (localStorage.getItem('token')) {
      let decodedToken = localStorage.getItem('token');
      let userName = jwt_decode(decodedToken)['sub'];
      this.profileService.get(userName).subscribe((res: any) => {
        this.clientId = res.id;
        console.log(this.clientId);
        //get ListeVote by clientId
        this.publicationService.getListVote(this.clientId).subscribe((res2: any) => {
          this.listeVote = res2;
        });
      });

    let data = {};

    this.publicationService.votePublication(data, this.clientId, item.id).subscribe((res: any) => {
      console.log(res)

      //rappeler l api get voteList pour mettre a jour la couleur du vote
      this.publicationService.getListVote(this.clientId).subscribe((res2: any) => {
        this.listeVote = res2;
        this.isVote(item);
      });

      //rappeler l'api countVote pour mettre a jour le compteur
      this.filterResult.forEach(element => {
        this.publicationService.countVote(element['id']).subscribe((res3: any) => {
          //inclure count dans tableau filterResult
          element['count'] = res3

        })

      })

    })
  }
  }

  isVote(item) {
    if (localStorage.getItem('token')){
      if (this.listeVote.includes(item.id)) {
        return true;
      } else {
        return false;
      }
    }
  }

  onClickCreate(){
    if(this.isOpened != true)
    {
      this.isOpened = true;
    }
    else{
      this.isOpened = false
    }
  }
 
}
