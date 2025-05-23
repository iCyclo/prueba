import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgxMasonryComponent, NgxMasonryModule } from 'ngx-masonry';
import { filter, map, switchMap, tap } from 'rxjs';
import { NasaImageComponent } from '../../shared/components/nasa-image/nasa-image.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { NasaService } from '../../shared/services/nasa.service';
import { NasaImageResponse } from '../../shared/types/nasa.types';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NasaImageComponent,
    PaginatorComponent,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class NasaComponent implements OnInit {
  private readonly nasaService = inject(NasaService);

  showToday: boolean = true;

  todayImage!: NasaImageResponse | null;
  allImages: NasaImageResponse[] = [];
  imagesPerPage = 10;
  currentPage = 1;

  startDateCtrl = new FormControl<Date | null>(null);
  endDateCtrl = new FormControl<Date | null>(null);

  constructor() {}

  ngOnInit() {
    this.nasaService
      .getTodayImage()
      .pipe(tap((image) => (this.todayImage = image)))
      .subscribe();
  }

  searchByRange() {
    const startDate = this.formatDate(this.startDateCtrl.value!);
    const endDate = this.formatDate(this.endDateCtrl.value!);
    if (endDate && startDate) {
      this.showToday = false;
      this.nasaService
        .getImagesInRange(startDate, endDate)
        .pipe(tap((images) => (this.allImages = images)))
        .subscribe();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.allImages.length / this.imagesPerPage);
  }

  get images(): NasaImageResponse[] {
    const start = (this.currentPage - 1) * this.imagesPerPage;
    return this.allImages.slice(start, start + this.imagesPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
