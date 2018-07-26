import { Component, OnInit, ElementRef, Input, AfterViewInit, OnDestroy, DoCheck } from '@angular/core';

import { DataApiService } from '../../services/data-api.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, empty } from 'rxjs';

@Component({
  selector: 'app-kbarticle-container',
  templateUrl: './kbarticle-container.component.html',
  styleUrls: ['./kbarticle-container.component.scss']
})
export class KBArticleContainerComponent implements OnInit, AfterViewInit, OnDestroy, DoCheck {
  @Input() wrapperClass = '';
  @Input() showSupportBtnList = false;
  @Input() desc = null;
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
      takeUntil(this.destroy$),
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
          this.kbList = (data['results'] && data['results'].length > 0) ? data['results'].slice(0, 5) : [];
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

  goToCreateSupportReqPage() {
    this.dataService.KBSearchKey$.next(this.desc);
  }

  ngAfterViewInit() {
    this.wrapperClass.split(' ').forEach( (className) => {
      this.elementRef.nativeElement.classList.add(className);
    });
  }

  ngDoCheck() {
    if (this.kbList && this.kbList.length > 0) {
      this.elementRef.nativeElement.classList.add('kbarticleContainer');
    } else {
      this.elementRef.nativeElement.classList.remove('kbarticleContainer');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
