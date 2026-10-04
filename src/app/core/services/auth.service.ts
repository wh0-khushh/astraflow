import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authKey = 'astraflow_authenticated';

  constructor(
    private router: Router
  ) {}

  login(email: string, password: string): boolean {

    // Temporary frontend authentication.
    // This will later be replaced with the real backend API.
    const validEmail = 'admin@astraflow.ai';
    const validPassword = 'admin123';

    if (email === validEmail && password === validPassword) {

      localStorage.setItem(this.authKey, 'true');

      return true;
    }

    return false;
  }

  logout(): void {

    localStorage.removeItem(this.authKey);

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {

    return localStorage.getItem(this.authKey) === 'true';
  }
}