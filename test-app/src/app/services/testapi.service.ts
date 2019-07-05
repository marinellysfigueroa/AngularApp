import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class testApiService {
    
    constructor(private httpclient: HttpClient) {}
getResponse(documentNumber: string, name: string): Observable<any> {
    let parameters = new HttpParams().set('documentNumber', documentNumber).set('name', name);
    return this.httpclient.get("http://localhost:8083/TestWS/webresources/rLogTest", { params: parameters});
}
}
