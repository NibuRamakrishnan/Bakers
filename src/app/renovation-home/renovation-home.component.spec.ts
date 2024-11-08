import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovationHomeComponent } from './renovation-home.component';

describe('RenovationHomeComponent', () => {
  let component: RenovationHomeComponent;
  let fixture: ComponentFixture<RenovationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenovationHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
