import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglesheetapiService } from '../googlesheetapi.service';
import { LoaderServiceService } from '../loader-service.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';

interface Expenses {
  ID:string,
  item: string;
  descr:string;
  amount: string;
  source:string;  
}

interface ExpensesDetail {
  amount:string,
  cash_from: string;
  daily_log_id:string;
  description: string;
  id:string;  
  particulars:string;
}
declare var bootbox: any;  
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
@Component({
  selector: 'app-add-new-logs',
  templateUrl: './add-new-logs.component.html',
  styleUrl: './add-new-logs.component.css'
})
export class AddNewLogsComponent implements OnInit {
  addnewlogform: FormGroup;
  ExpensejsonArray: Expenses[] = [];
  particulars = ""; 
  Amount = "";
  cashfrom ="";
  expid="";
  expense_total = 0;
  expense_total_fromshop=0;
  income_total= 0;
  id="";
  log_date="";
  open_balance="";
  cash_in_shop = "";
  cash_in_gpay = "";
  constructor(private route:ActivatedRoute, private storage:StorageService, private fb: FormBuilder, private service:GooglesheetapiService, private router:Router, private loader:LoaderServiceService) {
    this.addnewlogform = this.fb.group({
      log_date: ['', [Validators.required]],
      open_balance:[''],
      particulars:[''],
      description:[''],
      Amount :[''],
      cashfrom :[''],
      cash_in_shop :[''],
      cash_from_shop :[''],
      cash_in_gpay :[''],
      expid :[''],
      expense_total:[''],
      income_total:['']
    });
  } 
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? ""; 
    if(this.id.length > 0){
      this.LoadEditDetails(this.id);
    }
  }
  LoadEditDetails(id:string){
    var data = this.storage.getLocalItem("BussinessLogs");
    if(data != null){
      var json_Data = JSON.parse(data).records;
      if(json_Data != null && json_Data.length > 0){
        var filteredData = json_Data.filter((item:Transaction) => item.id == id);
        if(filteredData != null && filteredData.length > 0){ 
          this.expid=filteredData[0].id; 
          this.log_date =  this.formatDateymd(filteredData[0].log_date);
          this.open_balance = filteredData[0].open_balance;
          this.cash_in_shop =  filteredData[0].cash_in_shop;
          this.cash_in_gpay = filteredData[0].cash_in_gpay;
          this.expense_total = parseInt(filteredData[0].sum_expense);
          this.income_total = parseInt(filteredData[0].sum_income); 
          
          var detailed_Logs = this.storage.getLocalItem("DetailedLog");
          if(detailed_Logs != null){
            var json_Data_detail = JSON.parse(detailed_Logs).records;
            if(json_Data_detail != null && json_Data_detail.length > 0){
              var filteredData_detail = json_Data_detail.filter((item:ExpensesDetail) => item.daily_log_id == filteredData[0].id);              
              this.expense_total_fromshop = 0;
              if(filteredData_detail != null && filteredData_detail.length > 0){
                for(var i=0;i < filteredData_detail.length;i++){
                  this.ExpensejsonArray.push({item: filteredData_detail[i].particulars, amount: filteredData_detail[i].amount, descr:filteredData_detail[i].description, ID:filteredData_detail[i].id, source:filteredData_detail[i].cash_from});
                  if(this.ExpensejsonArray[i].source == "Shop"){
                    this.expense_total_fromshop = this.expense_total_fromshop + parseInt(this.ExpensejsonArray[i].amount); 
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  addExpenseDetails()
  {
    if (this.addnewlogform.valid) {
      var particulars = this.addnewlogform.value["particulars"] ?? '';
      var description = "defualt";
      var Amount = this.addnewlogform.value["Amount"] ?? 0;
      var cashfrom = this.addnewlogform.value["cashfrom"] ?? 0;
      var expid = crypto.randomUUID(); 
      if(this.addnewlogform.value["expid"] != ""){
        expid = this.addnewlogform.value["expid"]; 
      } 
      if(particulars != "" && Amount != "" && cashfrom != ""){ 
        if(this.addnewlogform.value["expid"] != ""){
          var index = this.ExpensejsonArray.findIndex(s => s.ID == this.addnewlogform.value["expid"]);
          this.ExpensejsonArray[index].item = particulars;
          this.ExpensejsonArray[index].descr = description;
          this.ExpensejsonArray[index].source = cashfrom;   
          this.ExpensejsonArray[index].amount = Amount;   
        }
        else{
          this.ExpensejsonArray.push({ item: particulars, descr: description,  amount: Amount, source:cashfrom, ID:expid});
        }
        this.expense_total_fromshop = 0;
        for(var i =0;i<this.ExpensejsonArray.length;i++){
          this.expense_total = this.expense_total + parseInt(this.ExpensejsonArray[i].amount);
          if(this.ExpensejsonArray[i].source == "Shop"){
            this.expense_total_fromshop = this.expense_total_fromshop + parseInt(this.ExpensejsonArray[i].amount);
          }
        }
        var income_in_shop_custom = 0;
        var income_in_gpay_custom = 0;
        if(this.addnewlogform.value["cash_in_shop"] != "" && this.addnewlogform.value["cash_in_shop"] != null){
          income_in_shop_custom = parseInt(this.addnewlogform.value["cash_in_shop"]);
        }
        if(this.addnewlogform.value["cash_in_gpay"] != "" && this.addnewlogform.value["cash_in_gpay"] != null){
          income_in_gpay_custom = parseInt(this.addnewlogform.value["cash_in_gpay"]);
        }
        this.income_total = this.expense_total_fromshop + income_in_gpay_custom + income_in_shop_custom;
        this.particulars ="";
        this.Amount="";
        this.cashfrom="";
        this.expid = "";
      }
    }
  } 
  fneditExpense(id:string){
    if(id != ""){
      var data =  this.ExpensejsonArray.filter(s=>s.ID == id);
      if(data != null && data.length > 0){
        for (let i = 0; i < data.length; i++) {
          this.particulars =data[i].item;
          this.Amount=data[i].amount;
          this.cashfrom=data[i].source;
          this.expid = id;
        } 
      }
    }
  }
  FindIncomeSum()
  {
    var income_in_shop = 0;
    var income_in_gpay = 0;
    var cash_from_shop_data =0; 
    if(this.addnewlogform.value["cash_from_shop"] != "" && this.addnewlogform.value["cash_from_shop"] != null){
      cash_from_shop_data = parseInt(this.addnewlogform.value["cash_from_shop"]);
    }
    if(this.addnewlogform.value["cash_in_shop"] != "" && this.addnewlogform.value["cash_in_shop"] != null){
      income_in_shop = parseInt(this.addnewlogform.value["cash_in_shop"]);
    }
    if(this.addnewlogform.value["cash_in_gpay"] != "" && this.addnewlogform.value["cash_in_gpay"] != null){
      income_in_gpay = parseInt(this.addnewlogform.value["cash_in_gpay"]);
    }
    this.income_total = income_in_shop + income_in_gpay+ cash_from_shop_data;
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()+1).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getUTCFullYear();
  
    return `${day}/${month}/${year}`;
  } 
  formatDateymd(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()+1).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getUTCFullYear();
  
    return `${year}-${month}-${day}`;
  } 
  onSubmit() {
    this.loader.show();
    if (this.addnewlogform.valid) {
      var log_date = this.addnewlogform.value["log_date"];
      var open_balance = this.addnewlogform.value["open_balance"] ?? 0; 
      var cash_in_shop = this.addnewlogform.value["cash_in_shop"] ?? 0; 
      var cash_from_shop = this.addnewlogform.value["cash_from_shop"] ?? 0; 
      var cash_in_gpay = this.addnewlogform.value["cash_in_gpay"] ?? 0; 
      var expense_total = this.addnewlogform.value["expense_total"] ?? 0; 
      var income_total = this.addnewlogform.value["income_total"] ?? 0; 
      var expense_details = this.ExpensejsonArray;
      var json_expense_string = "";
      var table = "DailyLog";
      var action = "insert";
      var id = "";
      if(this.id != "" && this.id.length > 0){
        action="update";
        id = this.id;
      }
      if(expense_details != null && expense_details.length > 0){
        json_expense_string = encodeURIComponent(JSON.stringify(expense_details));
      } 
      var parameters="id="+id+"&log_date="+log_date+"&open_balance="+open_balance+"&cash_in_shop="+cash_in_shop+"&cash_from_shop="+cash_from_shop+"&cash_in_gpay="+cash_in_gpay+"&sum_expense="+expense_total+"&sum_income="+income_total+"&json_expense_data="+json_expense_string+"&action="+action+"&table="+table+"";      
      console.log(parameters);
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
  }
  AfterInsert(result:any){  
    if(result.result == true){
      bootbox.alert("Daily log added successfully", this.ReloadDashboard());
    }
  }
  ReloadDashboard()
  {
    this.router.navigate(["Dashboard"]);
  } 
}
