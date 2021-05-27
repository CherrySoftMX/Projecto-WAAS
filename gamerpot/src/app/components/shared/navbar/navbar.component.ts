import { Component, OnInit } from '@angular/core';
import { DomainRoutes } from 'src/app/shared/routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  routes = DomainRoutes;

  constructor() {}

  ngOnInit(): void {}
}
