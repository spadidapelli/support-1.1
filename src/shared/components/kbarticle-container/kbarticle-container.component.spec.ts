import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ElementRef } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';

import { KBArticleContainerComponent } from './kbarticle-container.component';
import { DataApiService } from '../../services/data-api.service';
class MockDataApiService {
  onDescriptionChange$ = new BehaviorSubject<boolean>(false);
  KBArticleList$ = new BehaviorSubject<any>(null);
  getKBArticleList(searchText) {
    this.KBArticleList$.next({key: 'value'});
  }
}
export class MockElementRef {
  classList: DOMTokenList = null;
  nativeElement = {
    classList: this.classList
  };
 }

describe('KBArticleContainerComponent', () => {
  let component: KBArticleContainerComponent;
  let fixture: ComponentFixture<KBArticleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KBArticleContainerComponent ],
      imports: [ RouterModule,
                 HttpClientModule,
                 HttpClientTestingModule],
      providers: [
                  { provide: DataApiService, useClass: MockDataApiService },
                  { provide: ElementRef, useClass: MockElementRef },
              ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KBArticleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit - KBArticleList$', inject( [ DataApiService ], (dataService: DataApiService) => {
    component.ngOnInit();
     dataService.getKBArticleList('hello');
    dataService.KBArticleList$.subscribe((data) => {
      expect(component.kbList).toEqual(data);
      expect(component.spinner).toBeFalsy();

    });
  }));

  it('should check ngOnInit - onDescriptionChange$', inject( [ DataApiService ], (dataService: DataApiService) => {
    jasmine.clock().install();
    spyOn(dataService, 'getKBArticleList');
    dataService.onDescriptionChange$.next('hello');
    dataService.onDescriptionChange$.subscribe((isDescChanged) => {
      expect(component.kbList).toEqual(null);
      expect(component.spinner).toBeTruthy();
      jasmine.clock().tick(400);
      expect(dataService.getKBArticleList).toHaveBeenCalled();
    });
  }));
  it('should check ngAfterViewInit', inject([ ElementRef ], ( elementRef: ElementRef ) => {
    component.wrapperClass = 'col-md-6';
    component.ngAfterViewInit();
    expect(elementRef.nativeElement.classList).toEqual(null);
  }));
  it('should check ngOnDestroy', inject([ ElementRef ], ( elementRef: ElementRef ) => {
    spyOn(component.destroy$, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.destroy$.unsubscribe).toHaveBeenCalled();
  }));
});
