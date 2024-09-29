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
    console.log("trying to activate the user");
    this.authService.activateUser(token).subscribe(
      response => {
        console.log('User activated:', response);
        this.authService.saveUserInfoInLocalStorage(response);
        if(response.role == "CLIENT"){
          this.router.navigate(["/client/dashboard"]).then(
            ()=>{
              window.location.reload()
            }
          )
        }
        else if(response.role == "TRAVELER"){
          this.router.navigate(["/"]).then(
            ()=>{
              window.location.reload()
            }
          )
        }
      },
      error => {
        console.error('Activation failed:', error);
        this.router.navigate(["/login"]).then(() => {
          window.location.reload();
        });
      }
    );
  }
  

}
