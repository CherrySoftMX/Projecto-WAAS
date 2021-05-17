import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css'],
})
export class ComboBoxComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() label: string = '';

  @Output() onChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onValueChanged(value: string) {
    this.onChange.emit(value);
  }
}
