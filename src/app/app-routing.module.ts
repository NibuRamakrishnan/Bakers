import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { BussinessLogsComponent } from './bussiness-logs/bussiness-logs.component';
import { AddNewLogsComponent } from './add-new-logs/add-new-logs.component'; 
import { RenovationHomeComponent } from './renovation-home/renovation-home.component';
import { AddRenovationExpenseComponent } from './add-renovation-expense/add-renovation-expense.component';
import { DetailedExpenseViewComponent } from './detailed-expense-view/detailed-expense-view.component';
const routes: Routes = [
  { path: '', redirectTo: 'RenovationHome', pathMatch: 'full'},
  {path:'RenovationHome', component: RenovationHomeComponent},
  {path:'AddExpense/:type', component: AddRenovationExpenseComponent},
  {path:'DetailedView/:type', component:DetailedExpenseViewComponent}
  // { path: 'Home', component: HomeComponent },
  // { path: 'Dashboard', component: DashboardComponent },
  // {path:'BussinessLogs', component:BussinessLogsComponent},
  // {path:"AddLogs/:id", component:AddNewLogsComponent},
  // {path:"AddLogs", component:AddNewLogsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
