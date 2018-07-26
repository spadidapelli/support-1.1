import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, fromEvent } from 'rxjs';
import { takeUntil, map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  showSupportTabs =  false;
  destroy$ = new Subject<boolean>();
  desc = '';
  @ViewChild('kbSearchField') kbSearchField: ElementRef;
  constructor(private http: HttpClient, private dataService: DataApiService) { }

  ngOnInit() {
    this.dataService.KBArticleList$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.spinner = false;
      }
    });

    fromEvent(this.kbSearchField.nativeElement, 'keyup')
    .pipe(
    takeUntil(this.destroy$),
    map((event: any) => event.target['value']),
    debounceTime(500))
    .subscribe((searchText) => {
      this.spinner = true;
      this.dataService.onDescriptionChange$.next( searchText );
      this.showKbList = (searchText && searchText.length > 2);
    });
  }

  /* onKey(event: any) {
    this.spinner = true;
    if (event.target.value.length > 2) {
      this.dataService.onDescriptionChange$.next(event.target.value);
      this.showKbList = true;
    } else {
      this.showKbList = false;
      this.spinner = false;
    }
  } */

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
