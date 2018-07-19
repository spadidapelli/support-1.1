import { Component, OnInit, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

import { DataApiService } from '../../services/data-api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-kbarticle-container',
  templateUrl: './kbarticle-container.component.html',
  styleUrls: ['./kbarticle-container.component.scss']
})
export class KBArticleContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() wrapperClass = '';
  @Input() showSupportBtnList = false;
  @Input() numOfResultsPerPage = 3;
  kbList: any;
  destroy$ = new Subject<boolean>();
  spinner = true;
  currPageIndex = 1;
  numOfPages = [];
  currResults = [];
  constructor(private elementRef: ElementRef, private dataService: DataApiService) {
  }

  ngOnInit() {
    this.dataService.KBArticleList$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.kbList = data;
        this.applyPagination(this.kbList.results);
        this.spinner = false;
      }
    });
    this.dataService.onDescriptionChange$.subscribe((searchString) => {
      if (searchString) {
        this.spinner = true;
        this.kbList = null;
        this.dataService.getKBArticleList(searchString);
      } else {
        this.kbList = null;
        this.spinner = false;
      }
    });
  }

  applyPagination(res) {
    const totalResults = res.length;
    if (totalResults && totalResults <= this.numOfResultsPerPage) {
      this.currResults = this.kbList.results;
      return;
    }
    const _numOfPages = Math.round(totalResults / this.numOfResultsPerPage);
    this.numOfPages[_numOfPages - 1] = true;

    if ((totalResults % this.numOfResultsPerPage) > 0) {
      this.numOfPages[_numOfPages] = true;
    }
    this.showPage(1, null);
  }

  showPage(index, nextOrPrev) {

    if ((nextOrPrev === 'next' && this.currPageIndex === this.numOfPages.length) || (nextOrPrev === 'prev' && this.currPageIndex === 1)) {
      return;
    }

    if (nextOrPrev === 'next') {
      index = this.currPageIndex + 1;
    } else if (nextOrPrev === 'prev') {
      index = this.currPageIndex - 1;
    }
    const lowest = (index - 1) * this.numOfResultsPerPage;
    const highest = (index) * this.numOfResultsPerPage;
    this.currPageIndex = index;
    this.currResults = this.kbList.results.slice(lowest, highest);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.classList = this.wrapperClass;
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
}
