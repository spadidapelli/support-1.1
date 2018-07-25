import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, fromEvent } from 'rxjs';
import { takeUntil, map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DataApiService } from '../../shared/services/data-api.service';
@Component({
  selector: 'app-kbsearch',
  templateUrl: './kbsearch.component.html',
  styleUrls: ['./kbsearch.component.scss']
})
export class KbsearchComponent implements OnInit, OnDestroy {
  kbList = {};
  showKbList = false;
  spinner = false;
  showSupportTabs =  false;
  destroy$ = new Subject<boolean>();
  @ViewChild('kbSearchField') kbSearchField: ElementRef;
  constructor(private http: HttpClient, private dataService: DataApiService) { }

  openSupportRequest1 = {
    "results": [
      {
        "supportRequestId": "17365704402",
        "caseId": "17365704402",
        "requester": "christina Piccard",
        "status": "In progress",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      },
      {
        "supportRequestId": "17359320001",
        "caseId": "17359320001",
        "requester": "christina Piccard",
        "status": "On hold",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "17359702601",
        "caseId": "17359702601",
        "requester": "christina Piccard",
        "status": "In progress",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "16993708705",
        "caseId": "16993708705",
        "requester": "christina Piccard",
        "status": "In progress",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "16920910403",
        "caseId": "16920910403",
        "requester": "christina Piccard",
        "status": "On hold",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "16920918603",
        "caseId": "16920918603",
        "requester": "christina Piccard",
        "status": "In progress",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "17365704499",
        "caseId": "17365704499",
        "requester": "christina Piccard",
        "status": "On hold",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }
    ],
    "totalResults": 7
  };

  allSupportRequest1 = {
    "results": [
      {
        "supportRequestId": "17365704402",
        "caseId": "17365704402",
        "requester": "christina Piccard",
        "status": "In progress",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      },
      {
        "supportRequestId": "17359320001",
        "caseId": "17359320001",
        "requester": "christina Piccard",
        "status": "On hold",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "17359702601",
        "caseId": "17359702601",
        "requester": "christina Piccard",
        "status": "Closed",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "16993708705",
        "caseId": "16993708705",
        "requester": "christina Piccard",
        "status": "In progress",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "16920910403",
        "caseId": "16920910403",
        "requester": "christina Piccard",
        "status": "On hold",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "16920918603",
        "caseId": "16920918603",
        "requester": "christina Piccard",
        "status": "Closed",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "17365704499",
        "caseId": "17365704499",
        "requester": "christina Piccard",
        "status": "In progress",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      },
      {
        "supportRequestId": "18838760206",
        "caseId": "18838760206",
        "requester": "christina Piccard",
        "status": "On hold",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      },
      {
        "supportRequestId": "18838760606",
        "caseId": "18838760606",
        "requester": "christina Piccard",
        "status": "Closed",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }
    ],
    "totalResults": 7
  };


  closedSupportRequest1 = {
    "results": [
      {
        "supportRequestId": "18838760206",
        "caseId": "18838760206",
        "requester": "christina Piccard",
        "status": "Closed",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      },
      {
        "supportRequestId": "18838760606",
        "caseId": "18838760606",
        "requester": "christina Piccard",
        "status": "Closed",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "17359702601",
        "caseId": "17359702601",
        "requester": "christina Piccard",
        "status": "Closed",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "16993708705",
        "caseId": "16993708705",
        "requester": "christina Piccard",
        "status": "Closed",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "16920910403",
        "caseId": "16920910403",
        "requester": "christina Piccard",
        "status": "Closed",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "16920918603",
        "caseId": "16920918603",
        "requester": "christina Piccard",
        "status": "Closed",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }, {
        "supportRequestId": "17365704499",
        "caseId": "17365704499",
        "requester": "christina Piccard",
        "status": "Closed",
        "accountName": "229092999 - VMware Inc..",
        "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
        "severity": "3 - Medium ",
        "lastUpdateDate": "2018-07-03",
        "issueCategory": "VMware vSphere ESXi 5.5",
        "supportlevel": "Subscription Services"
      }
    ],
    "totalResults": 7
  };


  supportWatchList1 = {
          "results": [
        {
            "supportRequestId": "18765383704",
            "caseId": "18765383704",
            "requester" : "christina Piccard",
            "status": "In progress",
            "accountName": "229092999 - VMware Inc..",
            "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
            "severity": "4 - Low",
            "lastUpdateDate": "23/2/2017",
            "issueCategory": "VMware Cloud on AWS",
             "supportlevel": "Subscription Services"
        },
        {
            "supportRequestId": "18765383703",
            "caseId": "18765383703",
            "status": "On hold",
            "requester" : "christina Piccard",
            "accountName": "229092118 - EMC",
            "title": "This is a test case created for the purpose of smoke test. Case will be closed post completion of testing. No action needed",
            "severity": "4 - Low",
            "lastUpdateDate": "23/2/2017",
            "issueCategory": "VMware Cloud on AWS",
             "supportlevel": "Subscription Services"
        }
    ],
    "totalResults": 2
  };

  ngOnInit() {
    this.dataService.KBArticleList$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.spinner = false;
      }
    });

    fromEvent(this.kbSearchField.nativeElement, 'keyup')
    .pipe(
    map((event: any) => event.target['value']),
    debounceTime(500), distinctUntilChanged())
    .subscribe((searchText) => {
      this.spinner = true;
      this.dataService.onDescriptionChange$.next( searchText );
      this.showKbList = true;
    });
  }

  /* onKey(event: any) {
    this.spinner = true;
    if (event.target.value.length > 2) {
      this.dataService.onDescriptionChange$.next(event.target.value);
      this.showKbList = true;
    } else {
      this.showKbList = false;
      this.spinner = false;
    }
  } */

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
}
