import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglesheetapiService } from '../googlesheetapi.service';
import { LoaderServiceService } from '../loader-service.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';
interface RenovationData {
  id:string,
  work_type:string,
  expense:string,
  amount:string,
  timestamp:string,
  is_deleted:string,
  expense_type:string
}
declare var bootbox: any;  
@Component({
  selector: 'app-detailed-expense-view',
  templateUrl: './detailed-expense-view.component.html',
  styleUrl: './detailed-expense-view.component.css'
})

export class DetailedExpenseViewComponent implements OnInit {
expense_group: FormGroup;
constructor(private router:Router, private route:ActivatedRoute,private storage : StorageService,private fbb: FormBuilder, private service:GooglesheetapiService, private loader:LoaderServiceService){
  this.expense_group = this.fbb.group({
    group: [''],
    type:['']
  });
}
work_type="";
work_types:string[]=[];
filtered_data:RenovationData[] = [];
const_filtered_data:RenovationData[] = []; 
display_none = "display_block";
ngOnInit(): void {
  this.work_type = this.route.snapshot.paramMap.get('type') ?? ""; 
  var work_types_list = this.storage.getLocalItem("work_types"); 
  if(work_types_list != null){ 
    var work_types_list_json = work_types_list;
      for(var i=0;i<work_types_list_json.length;i++){
        this.work_types.push(work_types_list_json[i]["work_type"].toString());
      } 
  }
  this.LoadDetailedExpense(this.work_type); 
}
LoadDetailedExpense(type:string){
var json_expense = this.storage.getLocalItem("renovation_data");   
if(json_expense != null){ 
  if(json_expense != null && json_expense.length > 0){
    var type_data = json_expense;
    if(type != null && type.length > 0){
      type_data = type_data.filter(((s:RenovationData)=>s.work_type == type));
    }
    this.filtered_data = type_data;
    this.const_filtered_data = type_data;
  }
} 
}
fnGroupby()
{
  var group = this.expense_group.value["group"]; 
  if(group != null && group.length > 0){ 
    if(group != "--Select--"){
      this.display_none = "display_none";
      var total_sum =  this.storage.getLocalItem("renovation_data")
      .filter((s: RenovationData) => s.expense_type == group && s.work_type == this.work_type)
      .reduce((accumulator:string, current:RenovationData) => accumulator + parseInt(current.amount), 0);
      const jsonData: RenovationData = {
        id:"",
        work_type:this.work_type,
        expense:this.work_type,
        amount:total_sum,
        timestamp:"",
        is_deleted:"0",
        expense_type:group
    };
    this.filtered_data = [];
    this.filtered_data.push(jsonData);
    } 
    else{
      this.display_none="display_block";
    this.filtered_data = []; 
    this.filtered_data = this.const_filtered_data;
    }
  }
}
fnDeleteItem(id:string){ 
  if(id !=null){
    bootbox.confirm("Do you want to delete the entry?",(user_ok:boolean)=>{
      if(user_ok){
        this.service.doSubmitAPI("id=" + id + "&action=delete&table=Overall_status")
            .subscribe((result) => this.fnConfirmDelete(result, id));
      }
    })
  }
}
fnConfirmDelete(result:any, id:string){ 
if(result.result == "value deleted successfully"){
  const idToRemove = id;
  var existing_values = this.storage.getLocalItem("renovation_data");
  if(existing_values != null && existing_values.length > 0){
    existing_values = existing_values.filter((item:RenovationData) => item.id !== idToRemove); 
  } 
  this.storage.clearLocalStorage();
  this.storage.setLocalItem("renovation_data", existing_values); 
  window.location.reload(); 
}
}
AddNew()
{
  this.router.navigate(["AddExpense", this.work_type]); 
}
fnback()
{ 
  this.router.navigate(["RenovationHome"]); 
}
fntypeSelect()
{
  this.work_type =  this.expense_group.value["type"];
  this.LoadDetailedExpense(this.work_type);
} 
}
