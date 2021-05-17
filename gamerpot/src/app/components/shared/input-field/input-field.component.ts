import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
})
export class InputFieldComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';

  @Output() onChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onValueChanged(value: string) {
    this.onChange.emit(value);
  }
}
