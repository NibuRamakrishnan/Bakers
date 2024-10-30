import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessLogsComponent } from './bussiness-logs.component';

describe('BussinessLogsComponent', () => {
  let component: BussinessLogsComponent;
  let fixture: ComponentFixture<BussinessLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BussinessLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BussinessLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
