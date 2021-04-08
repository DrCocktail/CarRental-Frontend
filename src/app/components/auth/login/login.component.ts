import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { LoginModel } from '../../../models/Users/loginModel';
import { User } from 'src/app/models/Users/user';
import { UserService } from 'src/app/services/user.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerDetails } from 'src/app/models/Customers/customerDetail';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  customerDetail: CustomerDetails;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastrService.error('Lütfen boş alan bırakmayınız');
      return;
    }

    let loginModel: LoginModel = Object.assign({}, this.loginForm.value);

    this.authService.login(loginModel).subscribe(
      (responseSuccess) => {
        this.toastrService.success(responseSuccess.message, 'Başarılı');
        localStorage.setItem('token', responseSuccess.data.token);
        this.getUserByEmail(this.loginForm.value['email']);
        this.getCustomerByEmail(this.loginForm.value['email']);

        return this.router.navigate(['car']);
      },
      (responseError) => {
        return this.toastrService.error(responseError.error, 'Hata');
      }
    );
  }

  getUserByEmail(email: string) {
    this.userService.getUserByMail(email).subscribe((responseSuccess) => {
      this.user = responseSuccess.data;
      this.localStorageService.setCurrentUser(this.user);
    });
  }

  getCustomerByEmail(email: string) {
    this.customerService
      .getCustomerByEmail(email)
      .subscribe((responseSuccess) => {
        this.customerDetail = responseSuccess.data;
        this.localStorageService.setCurrentCustomer(this.customerDetail);
      });
  }

  getYear() {
    return new Date().getFullYear();
  }
}
