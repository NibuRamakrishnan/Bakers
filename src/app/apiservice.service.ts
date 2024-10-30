import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private httpclient : HttpClient) { }

  googlesheet_url = "https://script.google.com/macros/s/AKfycbznoLRbxmiu2HT4N6FKJTJnssDmNEovXq5oU1XgKiqqpV35r7P4la9DVwDqCMvp-JP58Q/exec?table=DailyLog&action=read";

  getBussinessLogs():Observable<any>{
    return this.httpclient.get(this.googlesheet_url);
  }
}
