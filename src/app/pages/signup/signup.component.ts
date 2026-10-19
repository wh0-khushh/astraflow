import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  agreeToTerms = false;
  isSubmitting = false;

  errorMessage = '';
  validatedNotice = '';

  openPolicy(name: string): void {
    window.alert(
      `${name} pages are not part of this UI preview yet.`
    );
  }

  constructor(
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  signup(): void {

    this.errorMessage = '';
    this.validatedNotice = '';

    if (
      !this.firstName.trim() ||
      !this.lastName.trim() ||
      !this.email.trim() ||
      !this.password.trim() ||
      !this.confirmPassword.trim()
    ) {
      this.errorMessage = 'Please complete all required fields.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must contain at least 8 characters.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.agreeToTerms) {
      this.errorMessage = 'Please accept the terms to continue.';
      return;
    }

    /* No account API exists yet — validate locally, then say so. */
    this.validatedNotice =
      'Details look valid, but account creation requires the backend ' +
      'API, which is not connected. No account was created.';
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}