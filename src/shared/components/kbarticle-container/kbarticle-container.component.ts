import { Component, OnInit, ElementRef, Input, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-kbarticle-container',
  templateUrl: './kbarticle-container.component.html',
  styleUrls: ['./kbarticle-container.component.scss']
})
export class KBArticleContainerComponent implements OnInit, AfterViewInit {
  @Input() kbList: any;
  @Input() wrapperClass: string;
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.classList = this.wrapperClass;
  }
}
