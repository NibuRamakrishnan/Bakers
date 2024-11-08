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
  /*Database for bakers app */
  //googlesheet_url = "https://script.google.com/macros/s/AKfycbzKVlkg73VZzHmQ9Fd-_Aj7yjgSOLqCyxPB4-zbhNOK18jCkXn9yqHo9_hITrP5quV0ZQ/exec?";
  
  /*Development url for renovation app*/
  //googlesheet_url="https://script.google.com/macros/s/AKfycbwWg8yLFLqzco1Wb7x6EM7Q4n9MhB_RZtwDt5TYxcJJFzz2UDN7DucYCVTPfH73prcL/exec?"
  
  /*Production*/
  googlesheet_url = "https://script.google.com/macros/s/AKfycbyLRex3Mh7kcgRhmeFOonjm7Mj8zHCWUsvvZGlEy1_5_w-XF-v37AuTtq86WAh6O32xwA/exec?";
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
  doSubmitAPI_Async(action_url : string){   
    return new Promise((resolve, reject) => {
      this.httpclient.get(this.googlesheet_url + action_url).pipe(
          finalize(() => {  
              this.loader.hide();
          })
      ).subscribe({
          next: data => resolve(data),
          error: error => reject(error)
      });
  });
}
}
