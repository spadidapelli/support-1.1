import { Component, OnInit, ElementRef, Input } from '@angular/core';

import { DataApiService } from '../../services/data-api.service';
@Component({
  selector: 'app-product-info-form',
  templateUrl: './product-info-form.component.html',
  styleUrls: ['./product-info-form.component.scss']
})
export class ProductInfoFormComponent implements OnInit {
  @Input() productInfo: any;
  selectedEmcName = 'Select EMC details';
  productForm = {
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
  constructor(elementRef: ElementRef, private dataService: DataApiService) {
    elementRef.nativeElement.classList.add('col-md-6');
  }

  ngOnInit() {
  }

  changeEmcData(name) {
    this.selectedEmcName = name;
  }

  onFormDataSubmit() {
    alert(JSON.stringify(this.productForm));
  }

  onProductDescriptionChange() {
    this.dataService.onDescriptionChange$.next(true);
  }

}
