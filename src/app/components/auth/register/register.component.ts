import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../../../models/Users/registerModel';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { User } from 'src/app/models/Users/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.toastrService.warning('Lütfen boş alan bırakmayınız');
      return;
    }

    if (
      this.registerForm.value['password'] !=
      this.registerForm.value['confirmPassword']
    ) {
      this.toastrService.error('Şifreler uyuşmuyor', 'Hata');
      return;
    }

    delete this.registerForm.value['confirmPassword'];

    let registerModel: RegisterModel = Object.assign(
      {},
      this.registerForm.value
    );

    this.authService.register(registerModel).subscribe(
      (responseSuccess) => {
        localStorage.setItem('token', responseSuccess.data.token);
        this.getUserByEmail(this.registerForm.value['email']);
        this.toastrService.success(responseSuccess.message, 'Başarılı');

        return this.router.navigate(['car']);
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
          responseError.status + ' ' + responseError.name,
          responseError.error
        );
      }
    );
  }

  getUserByEmail(email: string) {
    this.userService.getUserByMail(email).subscribe((responseSuccess) => {
      this.user = responseSuccess.data;
      this.localStorageService.setCurrentUser(this.user);
    });
  }

  getYear() {
    return new Date().getFullYear();
  }
}
