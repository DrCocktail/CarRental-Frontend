import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/Responses/responseModel';
import { ListResponseModel } from '../models/Responses/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = 'https://localhost:44380/api/cards/';

  constructor(private httpClient: HttpClient) {}

  add(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }

  getByCustomerId(customerId: number): Observable<ListResponseModel<Card>> {
    let newPath = this.apiUrl + 'getbycustomerıd?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }
}
