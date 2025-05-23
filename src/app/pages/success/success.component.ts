import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../../shared/services/share_data.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
  standalone: true,
})
export class SuccessComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly shareDataService = inject(ShareDataService);

  name!: string;

  constructor() {}

  ngOnInit() {
    this.shareDataService.data$.subscribe((data) => {
      if (!data) {
        this.router.navigate(['/form']);
        return;
      }
      this.name = `${data.name} ${data.paternalSurname} ${data.maternalSurname}`;
    });
  }
}
