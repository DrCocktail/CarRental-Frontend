import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css'],
})
export class BrandDeleteComponent implements OnInit {
  brand!: Brand;
  brandDeleteForm: FormGroup;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.getBrandById(param['brandId']);
    });
  }

  createBrandDeleteForm() {
    this.brandDeleteForm = this.formBuilder.group({
      brandId: [this.brand.brandId, Validators.required],
      brandName: [this.brand.brandName, Validators.required],
    });
  }

  delete(brand: Brand) {
    this.brandService.delete(brand).subscribe(
      (response) => {
        this.toastrService.success('Başarıyla silindi', 'Başarılı');
        this.router.navigate(['brand']);
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

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.createBrandDeleteForm();
    });
  }
}
