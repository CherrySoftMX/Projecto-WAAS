import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  @Input() placeholder: string;
  @Output() searchEvent = new EventEmitter<string>();

  constructor() {
    this.placeholder = 'search';
  }

  ngOnInit(): void {}

  search(text: string) {
    this.searchEvent.emit(text);
  }
}
