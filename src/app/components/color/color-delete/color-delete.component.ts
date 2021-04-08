import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css'],
})
export class ColorDeleteComponent implements OnInit {
  color: Color;
  colorDeleteForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.getColorById(param['colorId']);
    });
  }

  getColorById(colorId: number) {
    this.colorService.getColorById(colorId).subscribe((response) => {
      this.color = response.data;
      this.createColorDeleteForm();
    });
  }

  createColorDeleteForm() {
    this.colorDeleteForm = this.formBuilder.group({
      colorId: [this.color.colorId, Validators.required],
      colorName: [this.color.colorName, Validators.required],
    });
  }

  delete(color: Color) {
    this.colorService.delete(color).subscribe(
      (response) => {
        this.toastrService.success('Başarıyla silindi', 'Başarılı');
        this.router.navigate(['color']);
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
