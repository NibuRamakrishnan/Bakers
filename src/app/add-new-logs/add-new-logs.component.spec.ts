import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLogsComponent } from './add-new-logs.component';

describe('AddNewLogsComponent', () => {
  let component: AddNewLogsComponent;
  let fixture: ComponentFixture<AddNewLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
