import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnDestroy {

  private submitTimer: ReturnType<typeof setTimeout> | undefined;

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

    this.submitTimer = setTimeout(() => {

      this.isSubmitting = false;
      this.submitted = true;

    }, 700);
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.submitTimer) {
      clearTimeout(this.submitTimer);
    }
  }

}