import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  KBArticleList$ = new BehaviorSubject<any>(null);
  onDescriptionChange$ = new BehaviorSubject<string>('');
  articleList$;
  searchToken = '';//'eyJhbGciOiJIUzI1NiJ9.eyJwaXBlbGluZSI6IktCIENvbW11bml0eSIsImZpbHRlciI6IkBzb3VyY2U9S0IiLCJzZWFyY2hIdWIiOiJ2bXdhcmUiLCJ2OCI6dHJ1ZSwib3JnYW5pemF0aW9uIjoidm13YXJlZ3Nzc2VydmljZWNsb3Vkbm9ucHJvZHVjdGlvbjJnYTRlZ3V3aSIsInVzZXJJZHMiOlt7InByb3ZpZGVyIjoiRW1haWwgU2VjdXJpdHkgUHJvdmlkZXIiLCJuYW1lIjoibWFoZXNod2FyckB2bXdhcmUuY29tIiwidHlwZSI6IlVzZXIifV0sInJvbGVzIjpbInF1ZXJ5RXhlY3V0b3IiXSwidXNlckRpc3BsYXlOYW1lIjoiTWFoZXNod2FyIFJlZGR5IiwiZXhwIjoxNTMzMDIwMTA1LCJpYXQiOjE1MzI5MzM3MDV9.877ijzYz4m_gVjPl76kiqJIU9Uo-sU__Uy0hKD71IgY';
  searchTokenData$;
  KBSearchKey$ = new BehaviorSubject<string>('');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer xx7d01082c-3e13-43fa-a200-fe8b7d6b3202'
    })
  };
  constructor(private http: HttpClient) { }


  getKBProductInfo() {
    return this.http.get('/assets/mocks/KB-product-info.json');
  }

  getKBArticleList(searchString: string) {
    // const url = '/assets/kbList.json';
    const url = 'https://platform.cloud.coveo.com/rest/search?q=' + searchString + '&access_token='
      + this.searchToken;
    this.articleList$ = this.http.get(url);
    /* this.articleList$.subscribe((data) => {
      if (data) {
        this.KBArticleList$.next(data);
      }
    }); */
    return this.articleList$;
  }

  getSearchToken() {
    const url = 'https://platform.cloud.coveo.com/rest/search/token?organizationId=vmwaregssservicecloudnonproduction63sxup0q';
    const reqBody = {
      "userDisplayName": "Maheshwar Reddy",
      "userIds": [{
        "name": "maheshwarr@vmware.com",
        "provider": "Email Security Provider"
      }]
    };
    this.searchTokenData$ = this.http.post(url, reqBody, this.httpOptions);
    this.searchTokenData$.subscribe((res) => {
      //console.log(res);
      this.searchToken = res.token;
    }, (err) => {
      this.searchToken = 'eyJhbGciOiJIUzI1NiJ9.eyJwaXBlbGluZSI6IktCIENvbW11bml0eSIsImZpbHRlciI6IkBzb3VyY2U9S0IiLCJzZWFyY2hIdWIiOiJ2bXdhcmUiLCJ2OCI6dHJ1ZSwib3JnYW5pemF0aW9uIjoidm13YXJlZ3Nzc2VydmljZWNsb3Vkbm9ucHJvZHVjdGlvbjJnYTRlZ3V3aSIsInVzZXJJZHMiOlt7InByb3ZpZGVyIjoiRW1haWwgU2VjdXJpdHkgUHJvdmlkZXIiLCJuYW1lIjoibWFoZXNod2FyckB2bXdhcmUuY29tIiwidHlwZSI6IlVzZXIifV0sInJvbGVzIjpbInF1ZXJ5RXhlY3V0b3IiXSwidXNlckRpc3BsYXlOYW1lIjoiTWFoZXNod2FyIFJlZGR5IiwiZXhwIjoxNTMzODAwMzg5LCJpYXQiOjE1MzM3MTM5ODl9.u_dJylSOdYOU30kv_cEzVbJgn1N7wfi6KoYohL1rQjU';
    });
  }

  getSupportReqList() {
    return this.http.get('/assets/mocks/support-request-list.json');
  }
}
