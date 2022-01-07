import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  public isLoading = false;

  constructor() { }

  public show(): void {
    this.isLoading = true;
  }

  public hide(): void {
    this.isLoading = false;
  }
}
