import { Component, inject } from '@angular/core';
import { LoaderServiceService } from '../loader-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="loading$ | async" class="loader">
      Loading...
    </div>
  `,
  styles: [`
    .loader {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index:1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 1.5em;
    }
  `]
})
export class LoaderComponentComponent { 
  loading$: Observable<boolean>;
  constructor(private loaderService: LoaderServiceService) { 
    this.loading$ = this.loaderService.loading$;
  }  
}
