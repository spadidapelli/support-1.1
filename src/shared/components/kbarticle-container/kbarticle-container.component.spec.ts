import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KBArticleContainerComponent } from './kbarticle-container.component';

describe('KBArticleContainerComponent', () => {
  let component: KBArticleContainerComponent;
  let fixture: ComponentFixture<KBArticleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KBArticleContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KBArticleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
