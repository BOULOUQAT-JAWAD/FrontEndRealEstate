import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PjServicesSingleComponent } from './pj-services-single.component';

describe('PjServicesSingleComponent', () => {
  let component: PjServicesSingleComponent;
  let fixture: ComponentFixture<PjServicesSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PjServicesSingleComponent]
    });
    fixture = TestBed.createComponent(PjServicesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
