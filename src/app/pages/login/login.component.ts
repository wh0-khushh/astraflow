import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private submitTimer: ReturnType<typeof setTimeout> | undefined;

  email = '';
  password = '';

  showPassword = false;
  rememberMe = false;

  isSubmitting = false;
  errorMessage = '';

  private returnUrl = '/dashboard';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
      || '/dashboard';
  }

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

    /* Demo-only frontend check — see AuthService. */
    this.submitTimer = setTimeout(() => {

      const success = this.authService.login(
        this.email,
        this.password,
        this.rememberMe
      );

      this.isSubmitting = false;

      if (success) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.errorMessage =
          'Invalid credentials. This is a frontend demo — use the demo account shown below.';
      }

    }, 500);
  }

  fillDemoCredentials(): void {
    const demo = this.authService.demoCredentials;
    this.email = demo.email;
    this.password = demo.password;
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  ngOnDestroy(): void {
    if (this.submitTimer) {
      clearTimeout(this.submitTimer);
    }
  }

}
