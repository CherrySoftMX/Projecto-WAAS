import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-qr-code',
  templateUrl: './modal-qr-code.component.html',
  styleUrls: ['./modal-qr-code.component.css'],
})
export class ModalComponent implements OnInit {
  public title: string;
  public url: string;
  constructor(private activeModal: NgbActiveModal) {
    this.title = '';
    this.url = '';
  }
  ngOnInit(): void {}

  closeModal(): void {
    this.activeModal.close();
  }
}
