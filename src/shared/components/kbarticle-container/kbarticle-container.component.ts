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
  kbList: any;
  destroy$ = new Subject<boolean>();
  spinner = true;
  constructor(private elementRef: ElementRef, private dataService: DataApiService) {
  }

  ngOnInit() {
    this.dataService.getKBArticleList();
    this.dataService.KBArticleList$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.kbList = data;
        this.spinner = false;
      }
    });
    this.dataService.onDescriptionChange$.subscribe((isDescChanged) => {
      if (isDescChanged) {
        this.spinner = true;
        this.kbList = null;
        setTimeout(() => {
          this.dataService.getKBArticleList();
        }, 400);
      }
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.classList = this.wrapperClass;
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
}
