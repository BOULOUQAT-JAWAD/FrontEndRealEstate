import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit{
  token: string | null = null;

  constructor(private route: ActivatedRoute,
    private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
      if (this.token) {
        this.activateUser(this.token);
      }
    });
  }

  activateUser(token: string): void {
      this.authService.activateUser(token).subscribe(
        response => {
          console.log('User activated:', response);
          this.authService.saveUserInfoInLocalStorage(response);
          this.router.navigate(["/client/dashboard?userActivated=true"]).then(
            ()=>{
              window.location.reload()
            }
          )
        },
        error => {
          this.router.navigate(["/login"]).then(
            ()=>{
              window.location.reload()
            }
          )
          console.error('Activation failed:', error);
        }
      )
  }

}
