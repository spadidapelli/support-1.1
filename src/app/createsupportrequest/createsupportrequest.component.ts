import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataApiService } from '../../shared/services/data-api.service';

@Component({
  selector: 'app-createsupportrequest',
  templateUrl: './createsupportrequest.component.html',
  styleUrls: ['./createsupportrequest.component.scss']
})
export class CreatesupportrequestComponent implements OnInit, OnDestroy {
  emcDropDownList: Array<string>;
  productInfo$: Observable<any>;
  productData: any;
  destroy$ =  new Subject<boolean>();
  KBArticleList$: Observable<any>;
  kbList: any;
  showKbList = false;
  spinner = true;
  constructor(private dataService: DataApiService) { }

  ngOnInit() {
    this.productInfo$ = this.dataService.getKBProductInfo();
    this.productInfo$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.productData = data;
      this.spinner = false;
    }, (error) => {
      console.error(error);
    });
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }

}
