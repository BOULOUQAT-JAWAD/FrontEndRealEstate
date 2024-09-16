import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PjServicesComponent } from './pj-services.component';

describe('PjServicesComponent', () => {
  let component: PjServicesComponent;
  let fixture: ComponentFixture<PjServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PjServicesComponent]
    });
    fixture = TestBed.createComponent(PjServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
