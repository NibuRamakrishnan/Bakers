import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { BussinessLogsComponent } from './bussiness-logs/bussiness-logs.component';
import { AddNewLogsComponent } from './add-new-logs/add-new-logs.component'; 

const routes: Routes = [
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent },
  { path: 'Dashboard', component: DashboardComponent },
  {path:'BussinessLogs', component:BussinessLogsComponent},
  {path:"AddLogs/:id", component:AddNewLogsComponent},
  {path:"AddLogs", component:AddNewLogsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
