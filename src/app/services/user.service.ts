import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/Responses/listResponseModel';
import { User } from '../models/Users/user';
import { SingleResponseModel } from '../models/Responses/singleResponseModel';
import { ResponseModel } from '../models/Responses/responseModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = 'https://localhost:44380/api/user/';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserClaims(id: number): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'getuserclaimsbyıd?userId=' + id;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserById(id: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyıd?userId=' + id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getUserByMail(email: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getbymail?email=' + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.put<ResponseModel>(newPath, user);
  }
}
