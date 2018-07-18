import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BehaviorSubject, throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';

import { CreatesupportrequestComponent } from './createsupportrequest.component';
import { DataApiService } from '../../shared/services/data-api.service';
import { ProductInfoFormComponent } from '../../shared/components/product-info-form/product-info-form.component';
import { KBArticleContainerComponent } from '../../shared/components/kbarticle-container/kbarticle-container.component';

class MockDataApiService {
  onDescriptionChange$ = new BehaviorSubject<boolean>(false);
  KBArticleList$ = new BehaviorSubject<any>(null);
  getKBArticleList() {
    this.KBArticleList$.next({key: 'value'});
  }
  getKBProductInfo() {
    return new BehaviorSubject(null);
  }
}
describe('CreatesupportrequestComponent', () => {
  let component: CreatesupportrequestComponent;
  let fixture: ComponentFixture<CreatesupportrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesupportrequestComponent,
                      KBArticleContainerComponent,
                      ProductInfoFormComponent],
      imports: [ HttpClientModule,
                 HttpClientTestingModule,
                 RouterModule,
                 ClrFormsNextModule,
                 FormsModule,
                 ClarityModule],
      providers: [{ provide: DataApiService, useClass: MockDataApiService }]
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

  it('should check ngOnInit', inject( [ DataApiService ], (dataService: DataApiService) => {
    component.ngOnInit();
    component.productInfo$.subscribe((res) => {
      expect(component.productData).toEqual(null);
      expect(component.spinner).toEqual(false);
    });
  }));

  it('should check ngOnInit - error scenario', inject( [ DataApiService ], (dataService: DataApiService) => {
    spyOn(dataService, 'getKBProductInfo').and.returnValue(throwError('error'));
    spyOn(console, 'error');
    component.ngOnInit();
    component.productInfo$.subscribe((res) => {
    }, (err) => {
      expect(err).toEqual('error');
      expect(console.error).toHaveBeenCalledWith(err);
    });
  }));

  it('should check ngOnDestroy', inject( [ DataApiService ], (dataService: DataApiService) => {
    spyOn(component.destroy$, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.destroy$.unsubscribe).toHaveBeenCalled();
  }));
});
