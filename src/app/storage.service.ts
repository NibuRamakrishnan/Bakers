import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Set an item in localStorage
  setLocalItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get an item from localStorage
  getLocalItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Remove an item from localStorage
  removeLocalItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Set an item in sessionStorage
  setSessionItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Get an item from sessionStorage
  getSessionItem(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Remove an item from sessionStorage
  removeSessionItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Clear all items from localStorage
  clearLocalStorage(): void {
    localStorage.clear();
  } 

  // Clear all items from sessionStorage
  clearSessionStorage(): void {
    sessionStorage.clear();
  }
  formatAmount(amount: number): string {
    return amount.toLocaleString('en-US');
  } 
}
