import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'token';
  
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  setToken(token: string): void {
    console.log('Received token:', token);
    if (!token) {
      console.error('Token is undefined or null');
      return;
    }
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
      console.log('Token stored in local storage:', token);
    } else {
      this.transferState.set(makeStateKey<string>(this.tokenKey), token);
      console.log('Token stored in transfer state:', token);
    }
  }
  
  getToken(): string | null {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem(this.tokenKey) : this.transferState.get<string | null>(makeStateKey<string>(this.tokenKey), null);
    console.log('Retrieved token:', token);
    return token;
  }

  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    } else {
      this.transferState.remove(makeStateKey<string>(this.tokenKey));
    }
    console.log('Token cleared');
  }
}
