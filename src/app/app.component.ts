import { Component, OnInit } from '@angular/core';

import { DataApiService } from '../shared/services/data-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor (private dataService: DataApiService) {}

  ngOnInit() {
    this.dataService.getSearchToken();
  }
}
