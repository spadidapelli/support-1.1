import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as rxjs from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';

import { KbsearchComponent } from './kbsearch.component';
import { KBArticleContainerComponent } from '../../shared/components/kbarticle-container/kbarticle-container.component';
import { DataApiService } from '../../shared/services/data-api.service';

class MockDataApiService {
  KBArticleList$ = new rxjs.BehaviorSubject({key: 'value'});
  onDescriptionChange$ = new rxjs.BehaviorSubject(null);
}
describe('KbsearchComponent', () => {
  let component: KbsearchComponent;
  let fixture: ComponentFixture<KbsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbsearchComponent,
                      KBArticleContainerComponent ],
      imports: [ RouterModule,
                 HttpClientTestingModule ],
      providers: [ {provide: DataApiService, useClass: MockDataApiService} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should check ngOnInit', inject([ DataApiService ], (dataService: DataApiService) => {
      component.ngOnInit();
      dataService.KBArticleList$.subscribe((data) => {
        expect(component.spinner).toBeFalsy();
      });
    }));

    it('should check ngOnInit - KBArticleList is empty', inject([ DataApiService ], (dataService: DataApiService) => {
      dataService.KBArticleList$.next(null);
      component.spinner = true;
      component.ngOnInit();
      dataService.KBArticleList$.subscribe((data) => {
        if (!data) {
          expect(component.spinner).toBeTruthy();
        }
      });
    }));

  it('should check onKey - value length > 2', () => {
    const event = {
      target: {
        value: [1, 2, 3]
      }
    };
   /*  component.onKey(event);
    expect(component.spinner).toBeTruthy();
    expect(component.showKbList).toBeTruthy(); */
  });

  it('should check onKey - value length <= 2', () => {
    const event = {
      target: {
        value: [1, 2]
      }
    };
    /* component.onKey(event);
    expect(component.spinner).toBeFalsy();
    expect(component.showKbList).toBeFalsy(); */
  });
  it('should check fromEvent', async(inject( [ DataApiService ], (dataService: DataApiService) => {
    spyOn(dataService.onDescriptionChange$, 'next');
    Object.defineProperty(rxjs, 'fromEvent', {
     writable: true,
     value: () => {
       return rxjs.of({target: {value: 'abc'}});
     }
   });
     component.ngOnInit();
     rxjs.fromEvent(component.kbSearchField.nativeElement, 'keyup')
    .pipe(
    map((event: any) => {
      expect(event.target['value']).toEqual('abc');
      return event.target['value'];
     }),
     filter((text) => {
        expect(text.length).toEqual(3);
        return text;
     }),
    debounceTime(500))
    .subscribe((searchText) => {
      expect(component.spinner).toBeTruthy();
      expect(dataService.onDescriptionChange$.next).toHaveBeenCalledWith( searchText );
      expect(component.showKbList).toBeTruthy();
    });
   })));

});
