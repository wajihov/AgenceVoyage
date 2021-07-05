import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  header = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  constructor(private _http: HttpClient) { }
  token = localStorage.getItem('token');

  addPublication(id,data){
    
    return this._http.post("http://localhost:9091/Publication/addPublication/"+id,data,{headers: this.header});
  }

  getAllMyPublication(id){
    return this._http.get("http://localhost:9091/Publication/getAllPublicationById/"+id,{headers: this.header})
  }

  editPublication(id,data){
    console.log(id)
    console.log(data)
    return this._http.post("http://localhost:9091/Publication/editPublication/"+id,data,{headers: this.header})
  }
  changeStatus(data){
    return this._http.post("http://localhost:9091/Publication/changeStatus",data,{headers: this.header})
  }
  deletePublication(data){
    return this._http.post("http://localhost:9091/Publication/deletePublication",data,{headers: this.header})
  }
  getAllActivePublication(){
    return this._http.get("http://localhost:9091/Publication/getAll",{headers: this.header})
  }
  getRecentPublication(){
    
    return this._http.get("http://localhost:9091/Publication/getRecentPublication");
  }
  getActivatedPublication(){
    
    return this._http.get("http://localhost:9091/Publication/getActivatedPublication");
  }
  votePublication(data, clientId, publicationId){
    return this._http.post("http://localhost:9091/Vote/votePublication/"+clientId+"/"+publicationId, data,{headers: this.header})
  }
  getListVote(clientId){
    return this._http.get("http://localhost:9091/Vote/getListVote/"+clientId,{headers: this.header})
  }
  countVote(publicationId){
    return this._http.get("http://localhost:9091/Vote/countVote/"+publicationId)
  }
  getPublicationMostVoted(){
    return this._http.get("http://localhost:9091/Vote/getPublicationMostVoted")
  }

}
