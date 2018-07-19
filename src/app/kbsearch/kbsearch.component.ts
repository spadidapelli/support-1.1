import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, fromEvent } from 'rxjs';
import { takeUntil, map, filter, debounceTime } from 'rxjs/operators';
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
    map((evt: any) => event.target['value']),
    filter((text: string) => text.length > 2),
    debounceTime(1000))
    .subscribe((searchText) => {
      this.spinner = true;
      this.dataService.onDescriptionChange$.next( searchText );
      this.showKbList = true;
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
    this.destroy$.unsubscribe();
  }
}
