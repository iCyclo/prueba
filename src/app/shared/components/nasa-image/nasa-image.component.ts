import { Component, Input, OnInit } from '@angular/core';
import { NasaImageResponse } from '../../types/nasa.types';

@Component({
  selector: 'app-nasa-image',
  templateUrl: './nasa-image.component.html',
  styleUrls: ['./nasa-image.component.css'],
  standalone: true
})
export class NasaImageComponent implements OnInit {

  @Input()
  isTodayImage = true

  @Input()
  data!: NasaImageResponse;

  constructor() { }

  ngOnInit() {
  }

}
