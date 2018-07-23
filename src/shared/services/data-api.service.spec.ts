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
      dataService.getKBArticleList('hello');
      dataService.KBArticleList$.subscribe((res) => {
        if (res) {
          expect(res).toEqual({key: 'value'});
        }
      });
      MockHttp.match({
        url: 'https://platform.cloud.coveo.com/rest/search?q=hello&access_token=' + dataService.searchToken,
        method: 'GET'
      })[0].flush({key: 'value'});
  }));
  it('should check getKBArticleList - data not available', inject([DataApiService, HttpTestingController],
    (dataService: DataApiService, MockHttp: HttpTestingController) => {
      dataService.getKBArticleList('hello');
      dataService.KBArticleList$.subscribe((res) => {
          expect(res).toEqual(null);
      });
      MockHttp.match({
        url: 'https://platform.cloud.coveo.com/rest/search?q=hello&access_token=' + dataService.searchToken,
        method: 'GET'
      })[0].flush(null);
  }));
  it('should check getSearchToken - data available', inject([DataApiService, HttpTestingController],
    (dataService: DataApiService, MockHttp: HttpTestingController) => {
      const url = 'https://perf-vmstarcommunity.cs66.force.com/kb/services/apexrest/getsearchtoken';
      const reqBody = {
          'userDisplayName': 'Maheshwar Reddy',
          'emailId': 'maheshwarr@vmware.com',
          'searchHub': 'vmware'
        };
      dataService.getSearchToken();
      dataService.searchTokenData$.subscribe((res) => {
          expect(dataService.searchToken).toEqual('eyJhbGciOiJIUzI1NiJ9.eyJwaXBlbGluZSI6IktCIENvbW11bml0eSIsImZpbHRlciI6IkBzb3VyY2U9S0IiLCJzZWFyY2hIdWIiOiJ2bXdhcmUiLCJ2OCI6dHJ1ZSwib3JnYW5pemF0aW9uIjoidm13YXJlZ3Nzc2VydmljZWNsb3Vkbm9ucHJvZHVjdGlvbjJnYTRlZ3V3aSIsInVzZXJJZHMiOlt7InByb3ZpZGVyIjoiRW1haWwgU2VjdXJpdHkgUHJvdmlkZXIiLCJuYW1lIjoibWFoZXNod2FyckB2bXdhcmUuY29tIiwidHlwZSI6IlVzZXIifV0sInJvbGVzIjpbInF1ZXJ5RXhlY3V0b3IiXSwidXNlckRpc3BsYXlOYW1lIjoiTWFoZXNod2FyIFJlZGR5IiwiZXhwIjoxNTMyNDE1Mjg5LCJpYXQiOjE1MzIzMjg4ODl9.YgSBA7tmU4onqh8FLpmRcu_TeqZNyuu5GWFOaCb-bMc');
      });
      MockHttp.match({
        url: url,
        method: 'POST',
      })[0].flush(null);
  }));

  it('should check getSearchToken - data not available', inject([DataApiService, HttpTestingController],
    (dataService: DataApiService, MockHttp: HttpTestingController) => {
      const url = 'https://perf-vmstarcommunity.cs66.force.com/kb/services/apexrest/getsearchtoken';
      const reqBody = {
          'userDisplayName': 'Maheshwar Reddy',
          'emailId': 'maheshwarr@vmware.com',
          'searchHub': 'vmware'
        };
      dataService.getSearchToken();
      dataService.searchTokenData$.subscribe((res) => {
          expect(dataService.searchToken).toEqual('eyJhbGciOiJIUzI1NiJ9.eyJwaXBlbGluZSI6IktCIENvbW11bml0eSIsImZpbHRlciI6IkBzb3VyY2U9S0IiLCJzZWFyY2hIdWIiOiJ2bXdhcmUiLCJ2OCI6dHJ1ZSwib3JnYW5pemF0aW9uIjoidm13YXJlZ3Nzc2VydmljZWNsb3Vkbm9ucHJvZHVjdGlvbjJnYTRlZ3V3aSIsInVzZXJJZHMiOlt7InByb3ZpZGVyIjoiRW1haWwgU2VjdXJpdHkgUHJvdmlkZXIiLCJuYW1lIjoibWFoZXNod2FyckB2bXdhcmUuY29tIiwidHlwZSI6IlVzZXIifV0sInJvbGVzIjpbInF1ZXJ5RXhlY3V0b3IiXSwidXNlckRpc3BsYXlOYW1lIjoiTWFoZXNod2FyIFJlZGR5IiwiZXhwIjoxNTMyNDE1Mjg5LCJpYXQiOjE1MzIzMjg4ODl9.YgSBA7tmU4onqh8FLpmRcu_TeqZNyuu5GWFOaCb-bMc');
      }, (err) => {
        expect(dataService.searchToken).toEqual('eyJhbGciOiJIUzI1NiJ9.eyJwaXBlbGluZSI6IktCIENvbW11bml0eSIsImZpbHRlciI6IkBzb3VyY2U9S0IiLCJzZWFyY2hIdWIiOiJ2bXdhcmUiLCJ2OCI6dHJ1ZSwib3JnYW5pemF0aW9uIjoidm13YXJlZ3Nzc2VydmljZWNsb3Vkbm9ucHJvZHVjdGlvbjJnYTRlZ3V3aSIsInVzZXJJZHMiOlt7InByb3ZpZGVyIjoiRW1haWwgU2VjdXJpdHkgUHJvdmlkZXIiLCJuYW1lIjoibWFoZXNod2FyckB2bXdhcmUuY29tIiwidHlwZSI6IlVzZXIifV0sInJvbGVzIjpbInF1ZXJ5RXhlY3V0b3IiXSwidXNlckRpc3BsYXlOYW1lIjoiTWFoZXNod2FyIFJlZGR5IiwiZXhwIjoxNTMyNDE1Mjg5LCJpYXQiOjE1MzIzMjg4ODl9.YgSBA7tmU4onqh8FLpmRcu_TeqZNyuu5GWFOaCb-bMc');
    });
      MockHttp.match({
        url: url,
        method: 'POST',
      })[0].error(new ErrorEvent('Error'));
  }));


});
