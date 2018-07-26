import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRequestConfirmComponent } from './support-request-confirm.component';

describe('SupportRequestConfirmComponent', () => {
  let component: SupportRequestConfirmComponent;
  let fixture: ComponentFixture<SupportRequestConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportRequestConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportRequestConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
