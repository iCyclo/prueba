import { Injectable } from '@angular/core';
import { UserData } from '../types/user.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  private dataSubject = new BehaviorSubject<UserData | null>(null);

  data$ = this.dataSubject.asObservable();

  setData(data: UserData) {
    this.dataSubject.next(data);
  }
  getData(): UserData | null {
    return this.dataSubject.value;
  }
}
