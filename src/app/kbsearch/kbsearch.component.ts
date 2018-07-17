import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { takeUntil } from 'rxjs/operators';
import { DataApiService } from '../../shared/services/data-api.service';
@Component({
  selector: 'app-kbsearch',
  templateUrl: './kbsearch.component.html',
  styleUrls: ['./kbsearch.component.scss']
})
export class KbsearchComponent implements OnInit {
  kbList = {};
  showKbList = false;
  spinner = false;
  constructor(private http: HttpClient, private dataService: DataApiService) { }

  ngOnInit() {
    this.dataService.KBArticleList$.subscribe((data) => {
      if (data) {
        this.kbList = data;
        this.showKbList = true;
        this.spinner = false;
      }
    });
  }

  onKey(event: any) {
    this.spinner = true;
    if (event.target.value.length > 2) {
      /* let url = 'http://localhost:4200/assets/kbList.json';
      this.http.get(url).subscribe(res => this.kbList = res); */
      this.dataService.getKBArticleList();
    } else {
      this.showKbList = false;
      this.spinner = false;
    }
  }
}
