import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service'; 
@Component({
  selector: 'app-bussiness-logs',
  templateUrl: './bussiness-logs.component.html',
  styleUrl: './bussiness-logs.component.css'
})
export class BussinessLogsComponent implements OnInit {
constructor(private router:Router, private storage:StorageService){}
BussinessLogs = [];  
emptymessage="";
status ="";
inputValue: string = ''; 
ngOnInit(): void {
  this.getAllLogsfromStorage("BussinessLogs");  
}
getAllLogsfromStorage(key:string)
{ 
  if(key != ""){
    var logs_json_string =  this.storage.getLocalItem(key);
    if(logs_json_string != null){ 
      this.BussinessLogs = JSON.parse(logs_json_string).records; 
      console.log(this.BussinessLogs);  
    } 
  }
} 
formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()+1).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
} 
filterBussinessLogs(event : any)
{
  interface Transaction {
    id:string,
    log_date:string,
    open_balance:string,
    cash_in_shop:string,
    cash_from_shop:string,
    cash_in_gpay:string,
    sum_expense:string,
    sum_income:string,
    is_deleted:string,
    timestamp:string
  }
  var selectedDate = event.target.value; 
  var logs_from_storage = this.storage.getLocalItem("BussinessLogs");   
  var parsed_JSON = [];
  if(logs_from_storage != null){ 
    parsed_JSON = JSON.parse(logs_from_storage).records;
  }
  if(selectedDate!= null && selectedDate != ""){
    selectedDate = selectedDate;
    console.log(selectedDate);   
    if(parsed_JSON != null){  
      var parsed_JSON_filtered = parsed_JSON.filter((item:Transaction) => new Date(item.log_date).getDate() == new Date(selectedDate).getDate());
      if(parsed_JSON_filtered != null && parsed_JSON_filtered.length > 0){
        this.BussinessLogs = parsed_JSON_filtered;
        this.emptymessage = "";
      }
      else{
        this.BussinessLogs = parsed_JSON_filtered;
        this.emptymessage = "No records found in the specified date!"
      }
    }
  }
  else{
    if(parsed_JSON != null && parsed_JSON.length > 0){
      this.BussinessLogs = parsed_JSON;
      this.emptymessage = "";
    }
    else{
      this.BussinessLogs = parsed_JSON;
      this.emptymessage = "No records found in the specified date!"
    }
  }
}
resetFilter()
{ 
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(["BussinessLogs"]);
  });
}
OpenLogItem(id : string){
console.log(id);
if(id!=""){
this.router.navigate(["AddLogs", id]);
}
}
DeleteLogItem(id : string){
  console.log(id);
  if(id!=""){
    
  }
  }
  getBalanceAmount(sum_income : string, sum_expense:string){
    var balance =  parseInt(sum_income) - parseInt(sum_expense);  
    return balance;
  }
  getBalancestatus(sum_income : string, sum_expense:string){
    var balance =  parseInt(sum_income) - parseInt(sum_expense);  
    if(balance > 0){
      return "Profit";
    }
    else{
      return "Loss";
    }
  }
  getBalancestatusClass(sum_income : string, sum_expense:string){
    var balance =  parseInt(sum_income) - parseInt(sum_expense);  
    if(balance > 0){
      return "text-c-green";
    }
    else{
      return "text-c-red";
    }
  }
}
