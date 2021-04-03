import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customers/customer';
import { CustomerDetails } from 'src/app/models/Customers/customerDetail';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  customerDetails:CustomerDetails[]=[]

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomerDetails().subscribe((response) => {
      this.customerDetails = response.data;
    });
  }
}
