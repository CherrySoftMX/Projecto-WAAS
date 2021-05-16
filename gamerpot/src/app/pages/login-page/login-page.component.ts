import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../../components/register/register.component';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {

  }

  open() {
    const modalRef = this.modalService.open(RegisterComponent)
    modalRef.componentInstance.name = 'Register';
  }

}
