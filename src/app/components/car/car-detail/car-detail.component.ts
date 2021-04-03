import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { CarDetail } from '../../../models/Cars/carDetail';
import { Router, ActivatedRoute } from '@angular/router';
import { CarImageService } from '../../../services/car-image.service';
import { CarImage } from '../../../models/Cars/carImage';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetail;
  carImages: CarImage[] = [];
  imageBaseUrl = 'https://localhost:44380/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private carImageService: CarImageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getPhotosByCarId(params['carId']);
        this.getCarDetailByCarId(params['carId']);
      }
    });
  }

  getCarById(id: number) {
    this.carService.getCarById(id).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  getPhotosByCarId(carId: number) {
    this.carImageService.getPhotosByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  getCurrentSliderImageClass(sliderImage: CarImage): string {
    if (this.carImages[0] === sliderImage) {
      return 'carousel-item active';
    }

    return 'carousel-item';
  }

  getCarDetailByCarId(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  isAuthenticate(): boolean {
    return this.authService.isAuthenticated();
  }
}
