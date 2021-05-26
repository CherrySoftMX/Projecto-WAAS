import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() page = 1;
  @Input() collectionSize: number = 120;
  @Input() maxSize: number = 5;
  @Input() pageSize: number = 12;

  @Output() nextPage: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changePage() {
    this.nextPage.emit(this.page);
  }

}
