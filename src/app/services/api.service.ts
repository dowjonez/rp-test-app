import { Injectable } from '@angular/core';
import { of, Observer, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public base :string = "https://api.thecatapi.com/v1/";
  private apiKey : string = 'd1a6b6eb-fbd4-494a-a19a-cc3a7461a866';
  public sub_id: string = "uc1745";
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': this.apiKey
  });



  constructor(
    private http: HttpClient
  ) {

  }

  public getImages( ): Observable<any>{
    let request = this.http.get(
      this.base + "images/search",{
        headers: this.headers,
        "params":{
            limit: '5'
        }
      });
    return request
  }

  public get( action: string, id? : string): Observable<any>{
    let body = {
      image_id: id,
      sub_id: this.sub_id
    };

    let request = this.http.get(
      this.base + action,

      {
        headers: this.headers
      });
    return request
  }
  public post( image, vote, action ): Observable<any>{
    let body = {
      image_id: image.id,
      sub_id: this.sub_id
    };

   if (action == "votes"){
     body["value"] = vote;
   }
    let request = this.http.post(
      this.base + action,
      body,
      {
        headers: this.headers
      });
    return request
  }
  public delete( actionId, action ): Observable<any>{

    let request = this.http.delete(
      this.base + action + "/" + actionId ,
      {
        headers: this.headers
      });
    return request
  }
}
