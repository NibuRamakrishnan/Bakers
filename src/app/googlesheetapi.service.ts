import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, EMPTY } from 'rxjs';
import { LoaderServiceService } from './loader-service.service';
import { tap, finalize } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { json } from 'stream/consumers';
@Injectable({
  providedIn: 'root'
})
export class GooglesheetapiService { 
  
  constructor(private httpclient : HttpClient, private loader:LoaderServiceService, private storage:StorageService) { }

  googlesheet_url = "https://script.google.com/macros/s/AKfycbzKVlkg73VZzHmQ9Fd-_Aj7yjgSOLqCyxPB4-zbhNOK18jCkXn9yqHo9_hITrP5quV0ZQ/exec?";
  
  doSubmitAPI(action_url : string):Observable<any>{   
    var data : Observable<any>| null = null;
    data = this.httpclient.get(this.googlesheet_url + action_url).pipe(  
      finalize(() => { 
        this.loader.hide();
      })
    );
    return data;
    // if(this.storage.getLocalItem("BussinessLogs") == null){
      
    // } 
    // else{
    //   return  EMPTY;
    // }
  }
}
