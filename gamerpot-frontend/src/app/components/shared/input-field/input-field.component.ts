import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
})
export class InputFieldComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Output() onEnter = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onEnterPressed(value: string) {
    this.onEnter.emit(value);
  }

  onValueChanged(value: string) {
    this.valueChange.emit(value);
  }
}
