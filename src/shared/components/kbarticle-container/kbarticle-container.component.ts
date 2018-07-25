import { Component, OnInit, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

import { DataApiService } from '../../services/data-api.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, empty } from 'rxjs';

@Component({
  selector: 'app-kbarticle-container',
  templateUrl: './kbarticle-container.component.html',
  styleUrls: ['./kbarticle-container.component.scss']
})
export class KBArticleContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() wrapperClass = '';
  @Input() showSupportBtnList = false;
  kbList: any;
  destroy$ = new Subject<boolean>();
  spinner = true;
  constructor(private elementRef: ElementRef, private dataService: DataApiService) {
  }

  ngOnInit() {
    /* this.dataService.KBArticleList$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.kbList = data;
        this.spinner = false;
      }
    }); */
    this.dataService.onDescriptionChange$.pipe(
      switchMap((searchString) => {
        if (searchString && searchString.length > 2) {
          this.spinner = true;
          this.kbList = null;
          return this.dataService.getKBArticleList(searchString);
        } else {
          this.kbList = null;
          this.spinner = false;
          return empty();
        }
      })).subscribe(
        (data) => {
          this.kbList = data;
          this.spinner = false;
        }
      );
      /* .subscribe((searchString) => {
      if (searchString) {
        this.spinner = true;
        this.kbList = null;
        this.dataService.getKBArticleList(searchString);
      } else {
        this.kbList = null;
        this.spinner = false;
      }
    }); */
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.classList = this.wrapperClass;
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
}
