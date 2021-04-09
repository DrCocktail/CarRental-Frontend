import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/Customers/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css'],
})
export class CustomerUpdateComponent implements OnInit {
  customerUpdateForm: FormGroup;
  customer: Customer;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.getCustomerById(param['customerId']);
    });
  }

  getCustomerById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.data;
      this.createCustomerUpdateForm();
    });
  }

  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      id: [this.customer.id],
      userId: [this.customer.userId],
      companyName: [this.customer.companyName, Validators.required],
    });
  }

  update() {
    let customer: Customer = this.customerUpdateForm.value;

    if (!this.customerUpdateForm.valid) {
      this.toastrService.warning('Lütfen boş bilgi bırakmayın', 'Dikkat');
      return;
    }

    this.customerService.update(customer).subscribe(
      (responseSuccess) => {
        return this.toastrService.success(responseSuccess.message, 'Başarılı');
      },
      (responseError) => {
        if (responseError.error.ValidationErrors.length == 0) {
          this.toastrService.error(
            responseError.error.Message,
            responseError.error.StatusCode
          );
          return;
        }

        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(
            responseError.error.ValidationErrors[i].ErrorMessage,
            'Doğrulama Hatası'
          );
        }
      }
    );
  }
}
