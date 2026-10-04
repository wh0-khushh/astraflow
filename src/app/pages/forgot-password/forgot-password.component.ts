import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email = '';

  isSubmitting = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private router: Router
  ) {}

  sendResetLink(): void {

    this.errorMessage = '';

    if (!this.email.trim()) {
      this.errorMessage = 'Please enter your email address.';
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {

      this.isSubmitting = false;
      this.submitted = true;

    }, 700);
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }

}