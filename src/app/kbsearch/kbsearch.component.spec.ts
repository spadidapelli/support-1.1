import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbsearchComponent } from './kbsearch.component';

describe('KbsearchComponent', () => {
  let component: KbsearchComponent;
  let fixture: ComponentFixture<KbsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
