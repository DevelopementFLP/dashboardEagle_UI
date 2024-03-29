import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments.development';
import { Observable } from 'rxjs';
import { EagleResponse } from '../../model/EagleData.interface';

@Injectable({providedIn: 'root'})
export class TestService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getWeatherData(): Observable<any[]> {
        console.log(this.baseUrl);
        return this.http.get<any[]>(`${this.baseUrl}/WeatherForecast`);
    }
    
    getFakeData(limit: number): EagleResponse[] {
        const macnineNames = ["Smith 1", "Smith 2"];
        const fakeData: EagleResponse[] = [];

        for(let i = 0; i < limit; i++) {
            const eagleFakeData: EagleResponse = {
                machineName: macnineNames[this.getRandomInt(0, macnineNames.length)],
                productKey: this.getRandomInt(1000, 9999),
                productName: `Product ${i + 1}`,
                objectKey: this.getRandomInt(1000, 9999),
                barcode: `Barcode ${i + 1}`,
                bankidx: this.getRandomInt(1, 10),
                time: new Date(),
                value: this.getRandomInt(0, 1000),
                auxValue: this.getRandomInt(0, 1000)
            };

            fakeData.push(eagleFakeData);
        }

        return fakeData;
    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


}