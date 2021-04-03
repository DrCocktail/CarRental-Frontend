import { Injectable } from '@angular/core';
import { LoginModel } from '../models/Users/loginModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/Responses/singleResponseModel';
import { TokenModel } from '../models/Users/tokenModel';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/Users/registerModel';
import { LocalStorageService } from './local-storage.service';
import { Customer } from '../models/Customers/customer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44380/api/auth/';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let loginPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      loginPath,
      loginModel
    );
  }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let registerPath = this.apiUrl + 'register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      registerPath,
      registerModel
    );
  }

  update(customer: Customer): Observable<SingleResponseModel<TokenModel>> {
    let updatePath = this.apiUrl + 'update';
    return this.httpClient.put<SingleResponseModel<TokenModel>>(
      updatePath,
      customer
    );
  }

  isAuthenticated(): boolean {
    return !!this.localStorageService.getToken();
  }
}
