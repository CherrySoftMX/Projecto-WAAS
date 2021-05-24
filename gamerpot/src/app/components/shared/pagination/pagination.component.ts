import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() page: number = 1;
  @Input() total: number = 120;
  @Input() maxSize: number = 5;
  @Input() pageSize: number = 12;
  @Output() nextPage: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  pageChanged() {
    this.nextPage.emit(this.page);
  }
}
