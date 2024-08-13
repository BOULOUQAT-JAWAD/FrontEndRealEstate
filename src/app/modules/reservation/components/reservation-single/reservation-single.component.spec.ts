import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSingleComponent } from './reservation-single.component';

describe('ReservationSingleComponent', () => {
  let component: ReservationSingleComponent;
  let fixture: ComponentFixture<ReservationSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationSingleComponent]
    });
    fixture = TestBed.createComponent(ReservationSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
