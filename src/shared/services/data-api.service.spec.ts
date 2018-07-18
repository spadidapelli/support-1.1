import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataApiService } from './data-api.service';

describe('DataApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataApiService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([DataApiService], (service: DataApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should check getKBProductInfo', inject([DataApiService, HttpTestingController],
    (dataService: DataApiService, MockHttp: HttpTestingController) => {
      dataService.getKBProductInfo().subscribe((res) => {
        expect(res).toEqual({key: 'value'});
      });
      MockHttp.match({
        url: '/assets/mocks/KB-product-info.json',
        method: 'GET'
      })[0].flush({key: 'value'});
  }));
  it('should check getKBArticleList - data available', inject([DataApiService, HttpTestingController],
    (dataService: DataApiService, MockHttp: HttpTestingController) => {
      dataService.getKBArticleList();
      dataService.KBArticleList$.subscribe((res) => {
        if (res) {
          expect(res).toEqual({key: 'value'});
        }
      });
      MockHttp.match({
        url: '/assets/kbList.json',
        method: 'GET'
      })[0].flush({key: 'value'});
  }));
  it('should check getKBArticleList - data not available', inject([DataApiService, HttpTestingController],
    (dataService: DataApiService, MockHttp: HttpTestingController) => {
      dataService.getKBArticleList();
      dataService.KBArticleList$.subscribe((res) => {
          expect(res).toEqual(null);
      });
      MockHttp.match({
        url: '/assets/kbList.json',
        method: 'GET'
      })[0].flush(null);
  }));

});
