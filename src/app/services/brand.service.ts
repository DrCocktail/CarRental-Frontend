import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/Responses/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/Responses/responseModel';
import { SingleResponseModel } from '../models/Responses/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl: string = 'https://localhost:44380/api/brand/';

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(brandId: number): Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiUrl + 'getbybrandıd?id=' + brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  add(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  update(brand: Brand): Observable<ResponseModel> {
    console.log(brand);
    let newPath = this.apiUrl + 'update';
    return this.httpClient.put<ResponseModel>(newPath, brand);
  }

  delete(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
