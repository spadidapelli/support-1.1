import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';

import { DataApiService } from '../../services/data-api.service';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-product-info-form',
  templateUrl: './product-info-form.component.html',
  styleUrls: ['./product-info-form.component.scss']
})
export class ProductInfoFormComponent implements OnInit {
  @Input() productInfo: any = {};
  @ViewChild('kbSearchField') kbSearchField: ElementRef;
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
    fromEvent(this.kbSearchField.nativeElement, 'keyup')
    .pipe(
    map((event: any) => event.target['value']),
    debounceTime(500))
    .subscribe((searchText) => {
      this.dataService.onDescriptionChange$.next( searchText );
    });
  }

  changeEmcData(name) {
    this.selectedEmcName = name;
  }

  onFormDataSubmit() {
    alert(JSON.stringify(this.productForm));
  }

  /* onProductDescriptionChange(event) {
    this.dataService.onDescriptionChange$.next(event.target.value);
  } */

}
