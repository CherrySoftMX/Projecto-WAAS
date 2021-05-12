import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deals-row',
  templateUrl: './deals-row.component.html',
  styleUrls: ['./deals-row.component.css']
})
export class DealsRowComponent {
  @Input() displayType: string;

  constructor() {
    this.displayType = 'row';
  }

  ngOnInit(): void {
  }

}
