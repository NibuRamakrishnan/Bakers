import { OnInit, Component} from '@angular/core';
import { Router } from '@angular/router';
import { GooglesheetapiService } from '../googlesheetapi.service';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';
import { LoaderServiceService } from '../loader-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
constructor(private router:Router, private api:GooglesheetapiService, private service : StorageService, private loader:LoaderServiceService){}
sum_income=0;
sum_expenses = 0;
balance_amount = 0;
balance_amount_class="text-c-red";
date_range_format = "";
total_logs = 0; 
ngOnInit(): void {  
  this.loader.show();
  this.service.removeLocalItem("BussinessLogs");
  this.service.removeLocalItem("DetailedLog");
  this.getAllLogs();   
} 
getAllLogs(){ 
var action_url = "table=DailyLog&action=read";
this.api.doSubmitAPI(action_url).subscribe((result)=>this.fnSetLogsStorage(result))
}
fnSetLogsStorage(result:Observable<any>){ 
if(result != null){
var json_string = JSON.stringify(result);
if(json_string != ""){
  this.service.setLocalItem("BussinessLogs", json_string);
  var records = JSON.parse(json_string).records;
  if(records != null){ 
    this.total_logs = records.length;
    const dateArray: string[] = []; 
    for (let i = 0; i < records.length; i++) {
      this.sum_expenses = this.sum_expenses + parseInt(records[i].sum_expense);
      this.sum_income = this.sum_income + parseInt(records[i].sum_income); 
      dateArray.push(records[i].log_date);
    }
    this.balance_amount = this.sum_income - this.sum_expenses;
    this.date_range_format =  this.getMinAndMaxDate(dateArray);
    if(this.balance_amount > 0 ){
      this.balance_amount_class="text-c-green";
    }
    
  }
  this.getAllDetailedLogs();
}
}
}
getAllDetailedLogs(){ 
  this.loader.show();
  var action_url = "table=ExpenseDetail&action=read";
  this.api.doSubmitAPI(action_url).subscribe((result)=>this.fnsetDetailedLogs(result))
}
fnsetDetailedLogs(result:Observable<any>){ 
var json_string = JSON.stringify(result);
if(json_string != ""){
  this.service.setLocalItem("DetailedLog", json_string);
  this.getAllDetailedLogs();
}
}
LoadAllLogs(){
  this.router.navigate(['BussinessLogs']);
}
formatToMonthDay(dateString: string): string {
  const date = new Date(dateString);
  console.log(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}
getMinAndMaxDate(array : string[]){
  const dates = array.map(date => new Date(date));
  const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
  const maxDate = new Date(Math.max(...dates.map(date => date.getTime()))); 
  return minDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + " - " + maxDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

}
LoadNewLogs()
{
  this.router.navigate(["AddLogs"]);
}
}
