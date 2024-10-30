import { Component } from '@angular/core';  
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   constructor(private service:ApiserviceService, private router:Router){}
   getData(){
    // this.service.getBussinessLogs().subscribe((result)=>{
    //   console.log(result);
    // })
    this.router.navigate(['Dashboard']);
   }
}
