import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private localStorage: LocalStorageService, private activeRoute: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.islogedin();
  }

  logout() {
    this.localStorage.clear();
    this.activeRoute.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
