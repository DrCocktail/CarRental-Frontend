import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/Responses/listResponseModel';
import { Customer } from '../models/Customers/customer';
import { SingleResponseModel } from '../models/Responses/singleResponseModel';
import { ResponseModel } from '../models/Responses/responseModel';
import { CustomerDetails } from '../models/Customers/customerDetail';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl: string = 'https://localhost:44380/api/customer/';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerDetails(): Observable<ListResponseModel<CustomerDetails>> {
    let newPath = this.apiUrl + 'getcustomerdetail';
    return this.httpClient.get<ListResponseModel<CustomerDetails>>(newPath);
  }

  getCustomerByEmail(
    email: string
  ): Observable<SingleResponseModel<CustomerDetails>> {
    let newPath = this.apiUrl + 'getbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<CustomerDetails>>(newPath);
  }

  update(customer: Customer): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.put<ResponseModel>(newPath, customer);
  }
}
