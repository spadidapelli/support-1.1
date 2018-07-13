import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kbsearch',
  templateUrl: './kbsearch.component.html',
  styleUrls: ['./kbsearch.component.css']
})
export class KbsearchComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
kbList = {};
  showKbList = false;
  spinner = false;
 
  onKey(event: any) {
    this.spinner = true;
    if (event.target.value.length > 2) {
      let url = 'http://localhost:4200/assets/kbList.json';
      this.http.get(url).subscribe(res => this.kbList = res);
      this.showKbList = true;
      this.spinner = false;
    } else {
      this.showKbList = false;
      this.spinner = false;
    }
  }
}
