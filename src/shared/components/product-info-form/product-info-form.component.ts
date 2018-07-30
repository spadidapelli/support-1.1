import { Component, OnInit, ElementRef, Input, ViewChild, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { DataApiService } from '../../services/data-api.service';
import { fromEvent, Subject } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-product-info-form',
  templateUrl: './product-info-form.component.html',
  styleUrls: ['./product-info-form.component.scss']
})
export class ProductInfoFormComponent implements OnInit, OnDestroy {
  @Input() productInfo: any = {};
  @ViewChild('kbSearchField') kbSearchField: ElementRef;
  selectedEmcName = 'Select EMC details';
  @Input() spinner = false;
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

  destroy$ = new Subject<boolean>();
  constructor(elementRef: ElementRef, private dataService: DataApiService, private location: Location,
              private router: Router) {
    elementRef.nativeElement.classList.add('col-md-6');
  }

  ngOnInit() {

    this.dataService.KBSearchKey$.pipe(takeUntil(this.destroy$)).subscribe(
      (key) => {
        if (key) {
          this.productForm.desc = key;
        }
      }
    );

    this.productInfo.typeOfIssueList = [{
      'value': 'default',
      'name': 'Select One'
    }];
    fromEvent(this.kbSearchField.nativeElement, 'keyup')
    .pipe(
      takeUntil(this.destroy$),
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

  onSupportTypeChange() {
    this.productInfo.typeOfIssueList = [{
      'value': 'default',
      'name': 'Select One'
    }];
    const prodType = this.productForm.selectedProductType;
    const suppType = this.productForm.typeOfSupport;
     if (suppType === 'tech') {
      this.productInfo.typeOfIssueList = this.productInfo.typeOfIssue[prodType + suppType];
     } else if (suppType !== 'default') {
      this.productInfo.typeOfIssueList = this.productInfo.typeOfIssue[suppType];
     }
  }

  onSubmit() {
    this.router.navigate(['/requestConfirm']);
  }

  onCancel() {
    this.location.back();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /* onProductDescriptionChange(event) {
    this.dataService.onDescriptionChange$.next(event.target.value);
  } */

}
