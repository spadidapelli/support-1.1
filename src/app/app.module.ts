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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KBArticleContainerComponent } from '../shared/components/kbarticle-container/kbarticle-container.component';
import { ProductInfoFormComponent } from '../shared/components/product-info-form/product-info-form.component';
import { SupportrequestdetailsComponent } from './supportrequestdetails/supportrequestdetails.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadFileService } from './upload-file/upload-file.service';
import { FileTypeToIconService } from './upload-file/file-type-to-icon-service';

@NgModule({
  declarations: [
    AppComponent,
    KbsearchComponent,
    CreatesupportrequestComponent,
    HeaderComponent,
    KBArticleContainerComponent,
    ProductInfoFormComponent,
    SupportrequestdetailsComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    ROUTING,
    HttpClientModule,
    ClrFormsNextModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UploadFileService,FileTypeToIconService],
  bootstrap: [AppComponent]
})
export class AppModule { }
