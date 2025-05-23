import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import {
  DEFAULT_PASSWORD,
  MAX_ATTEMPTS,
} from '../../shared/util/constants.util';
import { UserData } from '../../shared/types/user.types';
import { state } from '@angular/animations';
import { ShareDataService } from '../../shared/services/share_data.service';
import { share } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class FormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly shareDataService = inject(ShareDataService);

  form!: FormGroup;
  currentAttempt = 0;
  btnDisabled = false;

  constructor() {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      paternalSurname: ['', Validators.required],
      maternalSurname: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  sendData() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    if (this.form.get('password')?.value !== DEFAULT_PASSWORD) {
      this.currentAttempt++;
    } else {
      const data: UserData = {
        name: this.form.get('name')?.value,
        paternalSurname: this.form.get('paternalSurname')?.value,
        maternalSurname: this.form.get('maternalSurname')?.value,
      };

      this.shareDataService.setData(data);

      this.router.navigate(['/success']);
    }

    if (this.currentAttempt >= MAX_ATTEMPTS) {
      this.btnDisabled = true;
      console.log('Contraseña incorrecta');
    }
  }
}
