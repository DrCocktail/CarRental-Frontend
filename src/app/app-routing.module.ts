import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { CardComponent } from './components/card/card.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDeleteComponent } from './components/car/car-delete/car-delete.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { CustomerDeleteComponent } from './components/customer/customer-delete/customer-delete.component';
import { BrandDeleteComponent } from './components/brand/brand-delete/brand-delete.component';
import { ColorDeleteComponent } from './components/color/color-delete/color-delete.component';

const routes: Routes = [
  { path: 'rental', component: RentalComponent },
  { path: 'cards', component: CardComponent },
  {
    path: 'customer',
    children: [
      { path: '', component: CustomerComponent },
      { path: 'add', component: CarAddComponent },
      { path: 'update/:customerId', component: CustomerUpdateComponent },
      { path: 'delete/:customerId', component: CustomerDeleteComponent },
    ],
  },
  {
    path: 'car',
    children: [
      { path: '', component: CarComponent },
      { path: 'add', component: CarAddComponent },
      { path: 'update/:carId', component: CarUpdateComponent },
      { path: 'delete/:carId', component: CarDeleteComponent },
      { path: 'filter/:brandId/:colorId', component: CarComponent },
      { path: 'detail/:carId', component: CarDetailComponent },
    ],
  },
  {
    path: 'brand',
    children: [
      { path: '', component: BrandComponent },
      { path: 'add', component: BrandAddComponent },
      { path: 'update/:brandId', component: BrandUpdateComponent },
      { path: 'delete/:brandId', component: BrandDeleteComponent },
    ],
  },
  {
    path: 'color',
    children: [
      { path: '', component: ColorComponent },
      { path: 'add', component: ColorAddComponent },
      { path: 'update/:colorId', component: ColorUpdateComponent },
      { path: 'delete/:colorId', component: ColorDeleteComponent },
    ],
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },

  { path: '**', redirectTo: 'car', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
