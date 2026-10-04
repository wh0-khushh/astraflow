import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  newPassword = '';
  confirmPassword = '';

  showNewPassword = false;
  showConfirmPassword = false;

  submitted = false;
  errorMessage = '';

  constructor(
    private router: Router
  ) {}

  resetPassword(): void {

    this.submitted = true;
    this.errorMessage = '';

    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill in both password fields.';
      return;
    }

    if (this.newPassword.length < 8) {
      this.errorMessage = 'Password must contain at least 8 characters.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    /*
     * BACKEND INTEGRATION
     * -------------------
     * Later Harshit will provide the reset-password API.
     *
     * Example:
     *
     * this.authService.resetPassword({
     *   token: this.token,
     *   password: this.newPassword
     * }).subscribe(...)
     *
     * For now we only validate the frontend form.
     */

    this.router.navigate(['/login']);
  }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}