import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE_URL = environment.base_url;
console.log(`this is base url in car service from environment=> ${BASE_URL}`)

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars() {
    let url = `${BASE_URL}api/cars`;
    return new Observable(observer=>{
      this.http.get(url)
        .subscribe({
          next: (res)=>{observer.next(res)},
          error: (err)=>{console.error(err)}
        })
    });
  }

  addCar(car: any) {
    let url = `${BASE_URL}api/cars`;
    return new Observable(observer=>{
      this.http.post(url, car)
        .subscribe({
          next: (res: any)=>{
            observer.next(res);
          },
          error: (err: any)=>{
            observer.error(err);
          }
        });
    });
  }

  sellCar(car: any) {
    let url = `${BASE_URL}api/cars/sell/${car._id}`;
    return new Observable(observer=>{
      this.http.post(url, car)
        .subscribe({
          next: (res: any)=>{
            observer.next(res);
          },
          error: (err: any)=>{
            observer.error(err);
          }
        });
    });
  }
}
