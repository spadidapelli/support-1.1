import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportrequestdetailsComponent } from './supportrequestdetails.component';

describe('SupportrequestdetailsComponent', () => {
  let component: SupportrequestdetailsComponent;
  let fixture: ComponentFixture<SupportrequestdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportrequestdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportrequestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
