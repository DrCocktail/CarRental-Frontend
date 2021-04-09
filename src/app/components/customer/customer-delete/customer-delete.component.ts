import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/Customers/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css'],
})
export class CustomerDeleteComponent implements OnInit {
  customerDeleteForm: FormGroup;
  customer: Customer;

  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.getCustomerById(param['customerId']);
    });
  }

  getCustomerById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.data;
      this.createColorDeleteForm();
    });
  }

  createColorDeleteForm() {
    this.customerDeleteForm = this.formBuilder.group({
      id: [this.customer.id, Validators.required],
      userId: [this.customer.userId, Validators.required],
      companyName: [this.customer.companyName, Validators.required],
    });
  }

  delete(customer: Customer) {
    this.customerService.delete(customer).subscribe(
      (response) => {
        this.toastrService.success('Başarıyla silindi', 'Başarılı');
        this.router.navigate(['customer']);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }
      }
    );
  }
}
