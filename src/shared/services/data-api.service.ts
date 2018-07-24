import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  KBArticleList$ = new BehaviorSubject<any>(null);
  onDescriptionChange$ = new BehaviorSubject<string>('');
  searchToken = '';
  searchTokenData$;
  constructor(private http: HttpClient) { }


  getKBProductInfo() {
    return this.http.get('/assets/mocks/KB-product-info.json');
  }

  getKBArticleList(searchString: string) {
    // const url = '/assets/kbList.json';
    const url = 'https://platform.cloud.coveo.com/rest/search?q=' + searchString + '&access_token='
    + this.searchToken;
    this.http.get(url).subscribe((data) => {
      if (data) {
        this.KBArticleList$.next(data);
      }
    });
  }

  getSearchToken() {
    const url = 'https://perf-vmstarcommunity.cs66.force.com/kb/services/apexrest/getsearchtoken';
    const reqBody = {
        'userDisplayName': 'Maheshwar Reddy',
        'emailId': 'maheshwarr@vmware.com',
        'searchHub': 'vmware'
      };
      this.searchTokenData$ = this.http.post(url, reqBody);
      this.searchTokenData$.subscribe((res) => {
      this.searchToken = 'eyJhbGciOiJIUzI1NiJ9.eyJwaXBlbGluZSI6IktCIENvbW11bml0eSIsImZpbHRlciI6IkBzb3VyY2U9S0IiLCJzZWFyY2hIdWIiOiJ2bXdhcmUiLCJ2OCI6dHJ1ZSwib3JnYW5pemF0aW9uIjoidm13YXJlZ3Nzc2VydmljZWNsb3Vkbm9ucHJvZHVjdGlvbjJnYTRlZ3V3aSIsInVzZXJJZHMiOlt7InByb3ZpZGVyIjoiRW1haWwgU2VjdXJpdHkgUHJvdmlkZXIiLCJuYW1lIjoibWFoZXNod2FyckB2bXdhcmUuY29tIiwidHlwZSI6IlVzZXIifV0sInJvbGVzIjpbInF1ZXJ5RXhlY3V0b3IiXSwidXNlckRpc3BsYXlOYW1lIjoiTWFoZXNod2FyIFJlZGR5IiwiZXhwIjoxNTMyNDE1Mjg5LCJpYXQiOjE1MzIzMjg4ODl9.YgSBA7tmU4onqh8FLpmRcu_TeqZNyuu5GWFOaCb-bMc';
      // this.cookieService.set('search-token', res['token']);
    }, (err) => {
      this.searchToken = 'eyJhbGciOiJIUzI1NiJ9.eyJwaXBlbGluZSI6IktCIENvbW11bml0eSIsImZpbHRlciI6IkBzb3VyY2U9S0IiLCJzZWFyY2hIdWIiOiJ2bXdhcmUiLCJ2OCI6dHJ1ZSwib3JnYW5pemF0aW9uIjoidm13YXJlZ3Nzc2VydmljZWNsb3Vkbm9ucHJvZHVjdGlvbjJnYTRlZ3V3aSIsInVzZXJJZHMiOlt7InByb3ZpZGVyIjoiRW1haWwgU2VjdXJpdHkgUHJvdmlkZXIiLCJuYW1lIjoibWFoZXNod2FyckB2bXdhcmUuY29tIiwidHlwZSI6IlVzZXIifV0sInJvbGVzIjpbInF1ZXJ5RXhlY3V0b3IiXSwidXNlckRpc3BsYXlOYW1lIjoiTWFoZXNod2FyIFJlZGR5IiwiZXhwIjoxNTMyNDE1Mjg5LCJpYXQiOjE1MzIzMjg4ODl9.YgSBA7tmU4onqh8FLpmRcu_TeqZNyuu5GWFOaCb-bMc';
    });
  }
}
