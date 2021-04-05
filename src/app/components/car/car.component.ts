import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarDetail } from '../../models/Cars/carDetail';
import { ActivatedRoute, Router } from '@angular/router';
import { CarImage } from 'src/app/models/Cars/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetail: CarDetail | undefined;
  carDetails: CarDetail[] = [];
  carImages: CarImage[] = [];
  imageBaseUrl = 'https://localhost:44380/';
  filterText: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private carImageService: CarImageService,
    private authService: AuthService
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

  getPhotosByCarId(carId: number) {
    this.carImageService.getPhotosByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
}
