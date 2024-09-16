import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePropertyComponent } from './one-property.component';

describe('OnePropertyComponent', () => {
  let component: OnePropertyComponent;
  let fixture: ComponentFixture<OnePropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnePropertyComponent]
    });
    fixture = TestBed.createComponent(OnePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
