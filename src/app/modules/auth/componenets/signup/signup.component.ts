import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signupForm!: FormGroup;

  constructor(private authService: AuthService,
              private router:Router) {

  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupRequest = this.signupForm.value;

      this.authService.signUpService(signupRequest).subscribe(
        (response)=>{
          console.log(response)
          this.router.navigate(["/login"],{queryParams:{registered:true}})
        },
        error => {

        }
      )
    } else {
      console.log('Form is not valid');
    }
  }

}
