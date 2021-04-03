import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/Responses/listResponseModel';
import { CarImage } from '../models/Cars/carImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl: string = 'https://localhost:44380/api/carimages/';

  constructor(private httpClient: HttpClient) {}

  getPhotosByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'getlistbycarıd?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
