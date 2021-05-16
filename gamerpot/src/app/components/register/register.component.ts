import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerData = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    rptPassword: new FormControl('')
  });
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  register() {
    alert(this.registerData.get("name")?.value);
    //register user

    //if ok
    this.activeModal.close();
  }

}
