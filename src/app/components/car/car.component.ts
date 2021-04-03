import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarDetail } from '../../models/Cars/carDetail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetail: CarDetail | undefined;
  carDetails: CarDetail[] = [];
  filterText: string = '';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] > 0 && params['colorId'] == 0) {
        return this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId'] > 0 && params['brandId'] == 0) {
        return this.getCarsByColorId(params['colorId']);
      } else if (params['brandId'] > 0 && params['colorId'] > 0) {
        return this.getCarsByBrandIdAndColorId(
          params['brandId'],
          params['colorId']
        );
      } else {
        return this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCarDetail().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarsByBrandIdAndColorId(brandId: number, cId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.carDetails = response.data.filter(
        (carDetail: CarDetail) => carDetail.colorId == cId
      );
    });
  }
}
