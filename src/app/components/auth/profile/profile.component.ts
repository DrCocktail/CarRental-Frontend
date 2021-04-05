import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { User } from 'src/app/models/Users/user';
import { CustomerDetails } from 'src/app/models/Customers/customerDetail';
import { Customer } from 'src/app/models/Customers/customer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  customerDetail: CustomerDetails;
  user: User;
  userUpdateForm: FormGroup;

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.createUserUpdateForm();
  }

  getUser() {
    this.user = this.localStorageService.getCurrentUser();
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      userId: [this.user.userId],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      companyName: [this.user.companyName],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
    });
  }

  update() {
    if (this.userUpdateForm.invalid) {
      this.toastrService.warning('Bilgileri kontrol ediniz', 'Dikkat');
      return;
    }

    if (
      this.userUpdateForm.value['password'] !=
      this.userUpdateForm.value['confirmPassword']
    ) {
      this.toastrService.warning('Şifreler uyuşmuyor', 'Dikkat');
      return;
    }

    delete this.userUpdateForm.value['confirmPassword'];
    let user: User = Object.assign({}, this.userUpdateForm.value);

    this.authService.update(user).subscribe(
      (responseSuccess) => {
        this.localStorageService.removeCurrentUser();
        delete user.password;
        this.localStorageService.setCurrentUser(this.userUpdateForm.value);

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

  getYear() {
    return new Date().getFullYear();
  }
}
