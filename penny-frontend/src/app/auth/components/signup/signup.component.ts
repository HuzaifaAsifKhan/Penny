import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm!: FormGroup;
  isSubmitting: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSignup() {
    this.isSubmitting = true;
    const credentials = this.signupForm.value;
    this.userService.attemptAuth('signup', credentials).subscribe({
      next: (data: any) => this.router.navigateByUrl('/auth/login'),
      error: (error: any) => {
        this.isSubmitting = false;
      },
    });
  }

  showErrors(formProperty: string): string {
    const controler: any = this.signupForm.controls[formProperty];
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
