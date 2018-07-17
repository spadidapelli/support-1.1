import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataApiService } from '../../shared/services/data-api.service';
@Component({
  selector: 'app-kbsearch',
  templateUrl: './kbsearch.component.html',
  styleUrls: ['./kbsearch.component.scss']
})
export class KbsearchComponent implements OnInit, OnDestroy {
  kbList = {};
  showKbList = false;
  spinner = false;
  destroy$ = new Subject<boolean>();
  constructor(private http: HttpClient, private dataService: DataApiService) { }

  ngOnInit() {
    this.dataService.KBArticleList$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.spinner = false;
      }
    });
  }

  onKey(event: any) {
    this.spinner = true;
    if (event.target.value.length > 2) {
      this.showKbList = true;
    } else {
      this.showKbList = false;
      this.spinner = false;
    }
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
}
