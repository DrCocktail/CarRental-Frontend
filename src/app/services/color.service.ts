import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/Responses/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/Responses/responseModel';
import { SingleResponseModel } from '../models/Responses/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiUrl: string = 'https://localhost:44380/api/color/';

  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getColorById(colorId: number): Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl + 'getbyıd?id=' + colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

  add(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  update(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.put<ResponseModel>(newPath, color);
  }

  delete(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
}
