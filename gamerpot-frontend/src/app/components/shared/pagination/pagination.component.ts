import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() page: number = 1;
  @Input() pageSize?: number;
  @Input() maxSize?: number;
  @Input() collectionSize?: number;

  @Output() nextPage: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  changePage() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });

    this.nextPage.emit(this.page);
  }
}
