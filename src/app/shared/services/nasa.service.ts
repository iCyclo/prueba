import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { NasaImageResponse } from '../types/nasa.types';

@Injectable({
  providedIn: 'root',
})
export class NasaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.nasa.gov/planetary/apod';
  private readonly apiKey = 'qn30fvuNg8IqJCjL5HAD7MkMLzAEc0ZCFWRvt5kc'; // Sustituye con tu propia API Key si la tienes

  constructor() {}

  getTodayImage(): Observable<NasaImageResponse> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get<NasaImageResponse>(this.apiUrl, { params });
  }

  getImagesInRange(startDate: string, endDate: string): Observable<NasaImageResponse[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('start_date', startDate)
      .set('end_date', endDate);

    return this.http.get<NasaImageResponse[]>(this.apiUrl, { params });
  }
}
