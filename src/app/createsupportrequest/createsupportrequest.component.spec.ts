import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesupportrequestComponent } from './createsupportrequest.component';

describe('CreatesupportrequestComponent', () => {
  let component: CreatesupportrequestComponent;
  let fixture: ComponentFixture<CreatesupportrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesupportrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesupportrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
