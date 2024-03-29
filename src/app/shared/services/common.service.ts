import { Injectable, numberAttribute } from '@angular/core';
import { EagleResponse } from '../../model/EagleResponse.interface';
import { EagleData } from '../../model/EagleData.interface';

@Injectable({providedIn: 'root'})
export class CommonService {

    constructor() { }
    
    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); 
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    getFirstDayOfWeek(date: Date) : Date {
        const dayOfWeek = date.getDay(); 
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 
        return new Date(date.setDate(diff)); 
      }
    
    getLastDayOfWeek(date: Date) : Date {   
        const firstDayOfWeek = date;
        const lastDayOfWeek = new Date(firstDayOfWeek); 
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); 
        return lastDayOfWeek;
      }

    getFilteredData(dataEagle: EagleResponse, day: string) : EagleData[] {
        const targetDate: Date = new Date(day);

        return dataEagle.data.filter(date => {
            const dataDate: Date = new Date(date.time);
            return dataDate >= targetDate;
        })
    }

    getDaysOfWeek(firstDay: Date): string[] {
        const days: string[] = [];
        const currentDay: Date = new Date();
        let currentDatePointer = new Date(firstDay);

        while(currentDatePointer <= currentDay){
            days.push(this.formatDate(currentDatePointer));
            currentDatePointer.setDate(currentDatePointer.getDate() + 1);
        }
        return days;
    }

    getRechazos(dataEagle: EagleData[]): number {
        return dataEagle.filter( lectura => { return lectura.bankidx == 0 }).length;
      }
    
    getNoLeidos(dataEagle: EagleData[]): number {
        return dataEagle.filter( lectura => { return lectura.barcode == '' }).length;
    }

    getDataByDate(dataEagle: EagleData[], daysOfWeek: string[]): EagleData[][] {
        const data: EagleData[][] = [];
       
        daysOfWeek.forEach(day => {
            const today: Date = new Date(day);
            const nextDay: Date = new Date(today);
            nextDay.setDate(today.getDate() + 1);
            data.push(dataEagle.filter( d => { return  new Date(d.time) > today && new Date(d.time) < nextDay }))
        });
        
        console.log(data)
        return data;
    }

    getLecturesCount(data: EagleData[][]): number[] {
        let n: number[] = [];
    
        data.forEach(d => {
            n.push(d.length)
        });
        return n;
    }

    getRechazoCount(data: EagleData[][]): number[]{
        let n: number[] = [];
    
        data.forEach(d => {
            n.push( d.filter(x => { return x.bankidx == 0 }).length)
        });
        return n;
    }

    getNoReadCount(data: EagleData[][]): number[]{
        let n: number[] = [];
    
        data.forEach(d => {
            n.push( d.filter(x => { return x.barcode == '' }).length)
        });
        return n;
    }

}