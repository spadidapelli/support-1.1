import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';

import { ProductInfoFormComponent } from './product-info-form.component';
import { DataApiService } from '../../services/data-api.service';

class MockDataApiService {
  onDescriptionChange$ = new BehaviorSubject<boolean>(false);
}
describe('ProductInfoFormComponent', () => {
  let component: ProductInfoFormComponent;
  let fixture: ComponentFixture<ProductInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfoFormComponent ],
      imports: [ FormsModule,
                 ClarityModule,
                 ClrFormsNextModule,
                 HttpClientModule,
                 HttpClientTestingModule],
      providers: [
          { provide: DataApiService, useClass: MockDataApiService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should changeEmcData', () => {
    component.changeEmcData('emc1');
    expect(component.selectedEmcName).toEqual('emc1');
  });

  it('should check onFormDataSubmit', () => {
    spyOn(window, 'alert');
    component.productForm = {
      emcData: 'default',
      serviceName: 'default',
      selectedProductType: 'onPremise',
      serviceId: 'default',
      supportType: 'default',
      typeOfSupport: 'default',
      typeOfIssue: 'default',
      toolOrSoftware: 'default',
      priority: 'default',
      desc: ''
    };
    component.onFormDataSubmit();
    expect(alert).toHaveBeenCalledWith(JSON.stringify(component.productForm));
  });

  it('should check onProductDescriptionChange', inject( [ DataApiService ], (dataService: DataApiService) => {
    spyOn(dataService.onDescriptionChange$, 'next');
    component.onProductDescriptionChange();
    expect(dataService.onDescriptionChange$.next).toHaveBeenCalledWith(true);
  }));
});
