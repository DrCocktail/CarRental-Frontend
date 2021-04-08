import { Injectable } from '@angular/core';
import { CustomerDetails } from '../models/Customers/customerDetail';
import { User } from '../models/Users/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  tokenKey: string = 'token';
  currentUser: string = 'currentUser';
  currentCustomer: string = 'currentCustomer';

  constructor() {}

  setToken(tokenValue: string) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenValue));
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  setCurrentUser(currentUserValue: User) {
    localStorage.setItem(this.currentUser, JSON.stringify(currentUserValue));
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(this.currentUser));
  }

  removeCurrentUser() {
    localStorage.removeItem(this.currentUser);
  }

  setCurrentCustomer(currentCustomerValue: CustomerDetails) {
    localStorage.setItem(
      this.currentCustomer,
      JSON.stringify(currentCustomerValue)
    );
  }

  getCurrentCustomer(): CustomerDetails {
    return JSON.parse(localStorage.getItem(this.currentCustomer));
  }

  removeCurrentCustomer() {
    localStorage.removeItem(this.currentCustomer);
  }
}
