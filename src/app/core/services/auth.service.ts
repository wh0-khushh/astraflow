import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* =========================================================
   DEMO authentication — frontend only.

   There is NO real authentication yet: no server, no token,
   no password hashing. This exists purely so the dashboard
   can be navigated in demos. It becomes a real
   POST /api/auth/login call once the Python backend exists.
   Never treat screens protected by this service as secure.
   ========================================================= */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authKey = 'astraflow_authenticated';
  private readonly emailKey = 'astraflow_user_email';
  private readonly rememberKey = 'astraflow_remember';

  /* Demo-only credentials. */
  private readonly demoEmail = 'admin@astraflow.ai';
  private readonly demoPassword = 'admin123';

  constructor(
    private router: Router
  ) {}

  get demoCredentials(): { email: string; password: string } {
    return { email: this.demoEmail, password: this.demoPassword };
  }

  login(email: string, password: string, rememberMe = false): boolean {

    if (email.trim().toLowerCase() === this.demoEmail && password === this.demoPassword) {

      localStorage.setItem(this.authKey, 'true');
      localStorage.setItem(this.emailKey, this.demoEmail);

      if (rememberMe) {
        localStorage.setItem(this.rememberKey, 'true');
      } else {
        localStorage.removeItem(this.rememberKey);
      }

      return true;
    }

    return false;
  }

  logout(): void {

    localStorage.removeItem(this.authKey);
    localStorage.removeItem(this.emailKey);

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {

    return localStorage.getItem(this.authKey) === 'true';
  }

  getUserEmail(): string {

    return localStorage.getItem(this.emailKey) || 'admin@astraflow.ai';
  }
}
