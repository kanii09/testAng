import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken'; // Key to store token in localStorage

  constructor() {}

  private get isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  /**
   * Logs in the user by storing the token.
   * @param token - The authentication token.
   */
  login(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  /**
   * Logs out the user by clearing the token.
   */
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  /**
   * Checks if the user is logged in.
   * @returns true if the user is logged in, false otherwise.
   */
  isLoggedIn(): boolean {
    return this.isBrowser && !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Retrieves the current user's authentication token.
   * @returns The stored token or null if not found.
   */
  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.TOKEN_KEY) : null;
  }
}
