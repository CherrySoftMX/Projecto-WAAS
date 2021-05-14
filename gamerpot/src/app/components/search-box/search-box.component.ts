import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input() placeholder: String;
  @Output() searchEvent = new EventEmitter<string>();

  constructor() {
    this.placeholder = 'search';
   }

  ngOnInit(): void {
  }

  search(text: string) {
    this.searchEvent.emit(text);
  }

}
