import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PjServicesListComponent } from './pj-services-list.component';

describe('PjServicesListComponent', () => {
  let component: PjServicesListComponent;
  let fixture: ComponentFixture<PjServicesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PjServicesListComponent]
    });
    fixture = TestBed.createComponent(PjServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
