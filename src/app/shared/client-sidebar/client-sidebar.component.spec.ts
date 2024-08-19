import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSidebarComponent } from './client-sidebar.component';

describe('ClientSidebarComponent', () => {
  let component: ClientSidebarComponent;
  let fixture: ComponentFixture<ClientSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSidebarComponent]
    });
    fixture = TestBed.createComponent(ClientSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
