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
  constructor(private dataService: DataApiService) { }

  ngOnInit() {
    this.productInfo$ = this.dataService.getKBProductInfo();
    this.productInfo$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.productData = data;
    }, (error) => {
      console.error(error);
    });

    this.dataService.KBArticleList$.subscribe((data) => {
      if (data) {
        this.kbList = data;
        this.showKbList = true;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }

}
