import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  showPassword = false;
  rememberMe = false;

  isSubmitting = false;
  errorMessage = '';

  constructor(
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {

    this.errorMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    this.isSubmitting = true;

    /*
     * Temporary frontend authentication.
     *
     * Backend authentication will replace this section later.
     */

    setTimeout(() => {

      localStorage.setItem('astraFlowAuthenticated', 'true');

      if (this.rememberMe) {
        localStorage.setItem('astraFlowRemember', 'true');
      }

      this.isSubmitting = false;

      this.router.navigate(['/dashboard']);

    }, 500);
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

}