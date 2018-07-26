import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataApiService } from '../../shared/services/data-api.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  supportReqList = null;
  constructor(private dataService: DataApiService) { }

  ngOnInit() {
    this.dataService.getSupportReqList().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        this.supportReqList = res;
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
