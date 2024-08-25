import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {

  constructor(private router: Router,private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = route.queryParams['token'];
    if (token) {
      this.authService.handleToken(token).subscribe(
        (response)=>{
          console.log(response)
          this.router.navigate(["/login"],{queryParams:{registered:true}})
          return false;
        },
        error => {
          return true;
        }
      );
    }
    return true;
  }

  handleToken(token: string): void {
    // Your logic to handle the token, e.g., send it to an API
    console.log('Received token:', token);

    // Example: After handling the token, redirect to the home page
    this.router.navigate(['/']);
  }
}
