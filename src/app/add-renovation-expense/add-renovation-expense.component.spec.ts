import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRenovationExpenseComponent } from './add-renovation-expense.component';

describe('AddRenovationExpenseComponent', () => {
  let component: AddRenovationExpenseComponent;
  let fixture: ComponentFixture<AddRenovationExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRenovationExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRenovationExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
