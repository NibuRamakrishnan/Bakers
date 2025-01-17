import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'; 
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BussinessLogsComponent } from './bussiness-logs/bussiness-logs.component';
import { AddNewLogsComponent } from './add-new-logs/add-new-logs.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderServiceService } from './loader-service.service';
import { LoaderComponentComponent } from './loader-component/loader-component.component';
import { RenovationHomeComponent } from './renovation-home/renovation-home.component';
import { AddRenovationExpenseComponent } from './add-renovation-expense/add-renovation-expense.component';
import { DetailedExpenseViewComponent } from './detailed-expense-view/detailed-expense-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    BussinessLogsComponent,
    AddNewLogsComponent,
    LoaderComponentComponent,
    RenovationHomeComponent,
    AddRenovationExpenseComponent,
    DetailedExpenseViewComponent, 
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    LoaderServiceService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
