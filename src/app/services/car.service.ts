import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/Responses/listResponseModel';
import { CarDetail } from '../models/Cars/carDetail';
import { SingleResponseModel } from '../models/Responses/singleResponseModel';
import { ResponseModel } from '../models/Responses/responseModel';
import { Car } from '../models/Cars/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl: string = 'https://localhost:44380/api/car/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDetail>> {
    let newPath: string = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetail(): Observable<ListResponseModel<CarDetail>> {
    let newPath: string = this.apiUrl + 'getcardetails';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarById(id: number): Observable<SingleResponseModel<CarDetail>> {
    let newPath: string = this.apiUrl + 'getbyıd?id=' + id;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  getDetailByCarId(id: number): Observable<SingleResponseModel<CarDetail>> {
    let newPath: string = this.apiUrl + 'getdatailbycarId?id=' + id;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrandId(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath: string = this.apiUrl + 'getbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColorId(colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath: string = this.apiUrl + 'getbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  update(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.put<ResponseModel>(newPath, car);
  }
}
