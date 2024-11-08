import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedExpenseViewComponent } from './detailed-expense-view.component';

describe('DetailedExpenseViewComponent', () => {
  let component: DetailedExpenseViewComponent;
  let fixture: ComponentFixture<DetailedExpenseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedExpenseViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedExpenseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
