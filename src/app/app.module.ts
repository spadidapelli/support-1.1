import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTING } from './app.routing';
import { KbsearchComponent } from './kbsearch/kbsearch.component';
import { CreatesupportrequestComponent } from './createsupportrequest/createsupportrequest.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { KBArticleContainerComponent } from '../shared/components/kbarticle-container/kbarticle-container.component';
import { ProductInfoFormComponent } from '../shared/components/product-info-form/product-info-form.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { SupportRequestConfirmComponent } from './support-request-confirm/support-request-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    KbsearchComponent,
    CreatesupportrequestComponent,
    HeaderComponent,
    KBArticleContainerComponent,
    ProductInfoFormComponent,
    TicketListComponent,
    SupportRequestConfirmComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    ROUTING,
    HttpClientModule,
    ClrFormsNextModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
