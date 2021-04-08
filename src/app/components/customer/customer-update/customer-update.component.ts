import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetails } from 'src/app/models/Customers/customerDetail';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css'],
})
export class CustomerUpdateComponent implements OnInit {
  customerUpdateForm: FormGroup;
  customerDetail: CustomerDetails;

  constructor(
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCustomer();
    this.createCustomerUpdateForm();
  }

  getCustomer() {
    this.customerDetail = this.localStorageService.getCurrentCustomer();
  }

  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      id: [this.customerDetail.id],
      companyName: [this.customerDetail.companyName],
      firstName: [this.customerDetail.firstName],
      lastName: [this.customerDetail.lastName],
      userId: [this.customerDetail.userId],
    });
  }

  update() {
    if (this.customerUpdateForm.invalid) {
      this.toastrService.warning('Bilgileri kontrol ediniz', 'Dikkat');
      return;
    }

    delete this.customerUpdateForm.value['confirmPassword'];
    let customerDetail: CustomerDetails = Object.assign(
      {},
      this.customerUpdateForm.value
    );

    this.customerService.update(customerDetail).subscribe(
      (responseSuccess) => {
        this.localStorageService.removeCurrentCustomer();
        this.localStorageService.setCurrentCustomer(
          this.customerUpdateForm.value
        );
        this.router.navigate(['car']);
        return this.toastrService.success(responseSuccess.message, 'Başarılı');
      },
      (responseError) => {
        if (responseError.error.ValidationErrors) {
          for (
            let i = 0;
            i < responseError.error.ValidationErrors.length;
            i++
          ) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama Hatası'
            );
          }

          return;
        }

        this.toastrService.error(
          responseError.error.StatusCode + ' ' + responseError.error.Message,
          responseError.name
        );
      }
    );
  }
}
