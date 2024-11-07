import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglesheetapiService } from '../googlesheetapi.service';
import { LoaderServiceService } from '../loader-service.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';  

declare var bootbox: any;  
interface RenovationData {
  id:string,
  work_type:string,
  expense:string,
  amount:string,
  timestamp:string,
  is_deleted:string,
  expense_type:string
}
@Component({
  selector: 'app-add-renovation-expense',
  templateUrl: './add-renovation-expense.component.html',
  styleUrl: './add-renovation-expense.component.css'
})
export class AddRenovationExpenseComponent  implements OnInit{ 
  addexpense: FormGroup;
  work_types: string[] = [];
  work_type : string="";
  expense_type : string="";
  expense:string="";
  amount:string="";
  id:string="";
  descriptions:string[]=[]; 
  desc:string="";
  modalclassname="";
  classname="display_none";
  dropclass="";
  constructor(private route:ActivatedRoute, private storage:StorageService, private fb: FormBuilder, private service:GooglesheetapiService, private router:Router, private loader:LoaderServiceService) {
    this.addexpense = this.fb.group({
      work_type: ['', [Validators.required]],
      expense_type:['', [Validators.required]],
      expense:['',  [Validators.required]],
      amount:['',  [Validators.required]]
    });
  } 
  ngOnInit(): void { 
    this.work_type = this.route.snapshot.paramMap.get('type') ?? ""; 
    var work_types_list = this.storage.getLocalItem("work_types");
    if(work_types_list != null){ 
      var work_types_list_json = work_types_list;
        for(var i=0;i<work_types_list_json.length;i++){
          this.work_types.push(work_types_list_json[i]["work_type"].toString());
        } 
    }
  }
  onSubmit() {  
    if (this.addexpense.valid) { 
      this.loader.show();
      var work_type = this.addexpense.value["work_type"];
      var expense = this.addexpense.value["expense"];
      var amount = this.addexpense.value["amount"] ?? 0;   
      var table = "Overall_status";
      var action = "insert";
      var id = "0"; 
      var expense_type = this.addexpense.value["expense_type"];
      var renovation_detail = this.storage.getLocalItem("renovation_data");
      if(renovation_detail !=null){
        var matched_data = renovation_detail.filter((s:RenovationData)=>s.expense == expense && s.expense_type == expense_type);
        if(matched_data != null && matched_data.length > 0){
          action = "update";
          id=matched_data[0].id;
          amount = parseInt(amount) + parseInt(matched_data[0].amount);
        }
      }
      // if(this.id != "" && this.id.length > 0){
      //   action="update";
      //   id = this.id;
      // } 
      var parameters="id="+id+"&work_type="+work_type+"&expense="+expense+"&amount="+amount+"&expense_type="+expense_type+"&action="+action+"&table="+table+"";      
      if(action == "update"){
        this.service.doSubmitAPI(parameters).subscribe((result)=>this.AfterUpdate(result));  
      }
      else{
        this.service.doSubmitAPI(parameters).subscribe((result)=>this.AfterInsert(result));
      }
    }
  }
  AfterUpdate(result:any){  
    if(result.result == "value updated successfully"){
      bootbox.alert("Daily log Updated successfully", this.ReloadDashboard());
    }
    this.loader.hide();
  }
  AfterInsert(result:any){  
    if(result.result == true){
      bootbox.alert("Daily log added successfully", this.ReloadDashboard());
    }
    this.loader.hide();
  }
  ReloadDashboard()
  {
    this.router.navigate(["RenovationHome"]);
  } 
  fnshowChoosePanel()
  {
    var renovation_data = this.storage.getLocalItem("renovation_data");
    if(renovation_data!= null){
      var description_subset : string[]=[];
      var descriptions_superset = renovation_data.filter((s:RenovationData)=>s.work_type == this.work_type);
      if(descriptions_superset != null && descriptions_superset.length > 0){
        for(var i=0 ; i< descriptions_superset.length; i++){
          description_subset.push(descriptions_superset[i].expense);
        }
        this.descriptions = description_subset; 
        this.modalclassname="show display_block";
        this.dropclass="modal-backdrop";
      }
    } 
  }   
  fncloseModal()
  { 
    this.modalclassname="";
    this.dropclass="";
    this.expense = "";
  }
  fnselectDescription(key : string){
    this.expense = key;
    this.modalclassname="";
    this.dropclass="";
  }
}
