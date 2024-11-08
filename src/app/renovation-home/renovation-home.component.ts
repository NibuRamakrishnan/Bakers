import { Component,  OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { GooglesheetapiService } from '../googlesheetapi.service';
import { Router } from '@angular/router';
interface WorkType {
  id:string,
  work_type:string,
  estimate_amount:string,
  timestamp:string,
  is_deleted:string 
}
interface Totals
{
  work_type:string,
  total:string
}
interface RenovationData {
  id:string,
  work_type:string,
  expense:string,
  amount:string,
  timestamp:string,
  is_deleted:string 
}
@Component({
  selector: 'app-renovation-home',
  templateUrl: './renovation-home.component.html',
  styleUrl: './renovation-home.component.css'
})
export class RenovationHomeComponent implements OnInit{
constructor(private storage: StorageService, private api:GooglesheetapiService, private router:Router){}
work_types = [];
renovation_data = [];
Total_Data : Totals[]=[];
expclass = "";
stausMessage = "";
ngOnInit(): void {
  this.storage.clearLocalStorage();
  this.api.doSubmitAPI("action=read&table=Overall_status").subscribe((result)=> this.fnSetLocalStorage(result, "renovation_data"));
  
}
fnSetLocalStorage(result:any, name:string){ 
  if(result != null && result.records != null){ 
    this.storage.setLocalItem(name, result.records.filter((s: RenovationData) => s.is_deleted == "0" || s.is_deleted == "").reverse());
    if(name == "renovation_data"){
      this.renovation_data=result.records;
    }   
    this.api.doSubmitAPI("action=read&table=Work_Type").subscribe((result)=>this.fnSetLocalStorageWork_Type(result));
  } 
}
fnSetLocalStorageWork_Type(result :any){
  if(result != null && result.records != null){ 
    this.storage.setLocalItem("work_types", result.records.filter((s: WorkType) => s.is_deleted == "0" || s.is_deleted == ""));
    this.work_types=result.records; 
    this.fnSetTotalArray();
  }
}
fnSetTotalArray()
{
  if(this.work_types != null && this.work_types.length>0){
      for(var i=0;i<this.work_types.length;i++){
      var work_type_data = (this.work_types[i] as WorkType).work_type; 
      if(work_type_data != "" && work_type_data != null){
        const sum = this.renovation_data
        .filter((s: RenovationData) => s.work_type === work_type_data)
        .reduce((accumulator, current:RenovationData) => accumulator + parseInt(current.amount), 0);
        this.Total_Data.push({work_type:work_type_data, total:sum.toString()});
      } 
      
    }
  } 
}
filterByWork_type(type : string){
  var sum = "0";
  if(type != "" && type != null && this.Total_Data != null && this.Total_Data.length > 0){
    sum =  this.Total_Data.filter(s=>s.work_type == type)[0].total;
    var estimate_amount_record =  this.work_types.filter((s:WorkType)=>s.work_type == type); 
    if(estimate_amount_record != null){ 
      if(parseInt(sum) > parseInt(estimate_amount_record[0]["estimate_amount"]))
      {
        this.expclass = "text-c-red";
        this.stausMessage ="Exceeds estimate"
      }
      else{
        this.expclass = "text-c-green";
        this.stausMessage ="On Track";
      }
    }
  } 
  return sum;
}
fnEdit(type:string){ 
  this.router.navigate(["DetailedView", type]);
}
navigateAdd()
{
  this.router.navigate(["AddExpense"]);
}
}
