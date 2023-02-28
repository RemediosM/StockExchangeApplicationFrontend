import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Share } from '../interfaces/share';

@Injectable({
  providedIn: 'root'
})
export class ShareHttpService {

  readonly appServerUrl: string = "http://localhost:8080/share";

  constructor(private httpClient: HttpClient) {}
   
  getShares(): Observable<Array<Share>> {
    return this.httpClient.get<Array<Share>>(this.appServerUrl + "/shares");
  }

  getShare(id: number): Observable<Share> {
    return this.httpClient.get<Share>(this.appServerUrl + "/edit/" + id);
  }

  editShare(id: number, share: Share): Observable<HttpResponse<Share>> {
    return this.httpClient.put<Share>(this.appServerUrl + "/edit/" + id, share, { observe : "response" });
  }

  addShare(share: Share): Observable<HttpResponse<Share>> {
    return this.httpClient.post<Share>(this.appServerUrl + "/new", share, { observe : "response" });
  }

  deleteShare(id: number): Observable<any> {
    let params = new HttpParams().set("id", id);
    return this.httpClient.delete(this.appServerUrl + "/delete", { params: params, observe: "response" });
  }
  
}
