import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/Responses/listResponseModel';
import { RentDetail } from '../models/Rents/rentDetail';
import { ResponseModel } from '../models/Responses/responseModel';
import { Rental } from '../models/Rents/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl: string = 'https://localhost:44380/api/rental/';
  rentingCar: Rental;

  constructor(private httpClient: HttpClient) {
    this.getRentals();
  }

  getRentals(): Observable<ListResponseModel<RentDetail>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<RentDetail>>(newPath);
  }
  getRentalsDetail(): Observable<ListResponseModel<RentDetail>> {
    let newPath = this.apiUrl + 'getrentaldetail';
    return this.httpClient.get<ListResponseModel<RentDetail>>(newPath);
  }

  getRentalsByCarId(carId: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getrentalbycarıd?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  setRentingCar(rental: Rental) {
    this.rentingCar = rental;
  }

  getRentingCar() {
    return this.rentingCar;
  }

  removeRentingCar() {
    this.rentingCar = null;
  }

  add(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
