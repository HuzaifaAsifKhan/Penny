import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitting: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onLogin() {
    this.isSubmitting = true;
    const credentials = this.loginForm.value;
    this.userService.attemptAuth('signin', credentials).subscribe({
      next: (data: any) => this.router.navigateByUrl('/'),
      error: (error: any) => {
        this.isSubmitting = false;
      },
    });
  }

  showErrors(formProperty: string): string {
    const controler: any = this.loginForm.controls[formProperty];
    if ((controler.touched || controler.dirty) && controler.errors) {
      if (controler.errors['required']) {
        return `${formProperty} must required`;
      } else if (controler.errors['minlength']) {
        return `${formProperty} have Insufficient Length`;
      }
      return '';
    }
    return '';
  }
}
