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

    this.submitted = false;
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
     * A real password reset requires the backend account API,
     * e.g. POST /api/auth/reset-password with a signed token
     * (proposed endpoint — not live). For now this screen
     * only validates the form and reports that honestly.
     */

    this.submitted = true;
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