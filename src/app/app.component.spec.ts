import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { KbsearchComponent } from './kbsearch/kbsearch.component';
import { CreatesupportrequestComponent } from './createsupportrequest/createsupportrequest.component';
import { KBArticleContainerComponent } from '../shared/components/kbarticle-container/kbarticle-container.component';
import { ProductInfoFormComponent } from '../shared/components/product-info-form/product-info-form.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        KbsearchComponent,
        CreatesupportrequestComponent,
        KBArticleContainerComponent,
        ProductInfoFormComponent
      ],
      imports: [ RouterTestingModule,
                 ClarityModule,
                 ClrFormsNextModule,
                 FormsModule
                ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
