import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';

import { CommonService } from '../../shared/services/common.service';
import { EagleData } from '../../model/EagleData.interface';
import { interval } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  eagleDayDataSmith1: EagleData[] = [];
  eagleWeekDataSmith1: EagleData[] = [];
  eagleDayDataSmith2: EagleData[] = [];
  eagleWeekDataSmith2: EagleData[] = [];
  tiposEagle: string[] = ['Smiths 1', 'Desosado 1', 'Desosado 2'];
  eagleDayDataDesosado2: EagleData[] = [];
  eagleWeekDataDesosado2: EagleData[] = [];

  firstDay?: Date;
  daysOfWeek: string[] = [];
  chartDataSmith1: any;
  chartDataSmith2: any;
  chartDataDesosado2: any;
  options: any;

  chSM1: EagleData[][] = [];
  chSM2: EagleData[][] = [];
  chD2: EagleData[][] = [];

  constructor(
    private commonService: CommonService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getEagleData();
    this.daysOfWeek = this.commonService.getDaysOfWeek(this.firstDay!); 

    interval(300000).subscribe(() =>
      {
        this.getEagleData();
        this.daysOfWeek = this.commonService.getDaysOfWeek(this.firstDay!);
      }
    );
  }

  private getEagleData() {
    const today: Date = new Date();
    const dateFrom: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const todayFromFormatted = this.commonService.formatDate(dateFrom);
    const startDayOfWeek: Date = this.commonService.getFirstDayOfWeek(dateFrom);
    const firstDayOfWeekFormatted = this.commonService.formatDate(startDayOfWeek);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                 color: textColorSecondary
              },
              grid: {
                  //color: surfaceBorder,
                  drawBorder: false
              }
          }

      }
  };

    const fechaActual: Date = new Date();

    const headersEagle = new HttpHeaders({
      'Connection-String-Name': 'EagleConnectionString'
    });

    const headersNuevaEagle = new HttpHeaders({
      'Connection-String-Name': 'EagleNuevaConnectionString'
    });

    fechaActual.setHours(-3, 0, 0, 0);
    this.firstDay = startDayOfWeek;

    /* DESOSADO 1*/
    this.apiService.getAll(firstDayOfWeekFormatted, headersEagle)
      .subscribe((data) => {
       // this.eagleDayDataSmith1 = this.commonService.getFilteredData(data, todayFromFormatted).filter(mach => { return mach.machineName == "Smiths No 1"});
        //this.eagleWeekDataSmith1 = data.data.filter(mach => { return mach.machineName == "Smiths No 1"});
        this.eagleDayDataSmith2 = this.commonService.getFilteredData(data, todayFromFormatted).filter(mach => { return mach.machineName == "Smiths No 2"});
        this.eagleWeekDataSmith2 = data.data.filter(mach => { return mach.machineName == "Smiths No 2"});

        //this.chSM1 = this.commonService.getDataByDate(this.eagleWeekDataSmith1, this.daysOfWeek);
        this.chSM2 = this.commonService.getDataByDate(this.eagleWeekDataSmith2, this.daysOfWeek);

        // this.chartDataSmith1 = {
        //   labels: this.daysOfWeek,
        //   datasets: [
        //     {
        //       label: 'Total lecturas',
        //       data: this.commonService.getLecturesCount(this.chSM1)
        //     },
        //     {
        //       label: 'Rechazos',
        //       data: this.commonService.getRechazoCount(this.chSM1)
        //     },
        //     {
        //       label: 'No leidas',
        //       data: this.commonService.getNoReadCount(this.chSM1)
        //     }
        //   ]
        // }
    
        this.chartDataSmith2 = {
          labels: this.daysOfWeek,
          datasets: [
            {
              label: 'Total lecturas',
              data: this.commonService.getLecturesCount(this.chSM2)
            },
            {
              label: 'Rechazos',
              data: this.commonService.getRechazoCount(this.chSM2)
            },
            {
              label: 'No leidas',
              data: this.commonService.getNoReadCount(this.chSM2)
            }
          ]
        }
    
        this.options = options;
      });

      /* DESOSADO 2 */
      this.apiService.getAll(firstDayOfWeekFormatted, headersNuevaEagle)
        .subscribe(data => {
          console.log(data)
          this.eagleDayDataDesosado2 = this.commonService.getFilteredData(data, todayFromFormatted);
          this.eagleWeekDataDesosado2 = data.data;
          this.chD2 = this.commonService.getDataByDate(this.eagleWeekDataDesosado2, this.daysOfWeek);

          this.chartDataDesosado2 = {
            labels: this.daysOfWeek,
            datasets: [
              {
                label: 'Total lecturas',
                data: this.commonService.getLecturesCount(this.chD2)
              },
              {
                label: 'Rechazos',
                data: this.commonService.getRechazoCount(this.chD2)
              },
              {
                label: 'No leidas',
                data: this.commonService.getNoReadCount(this.chD2)
              }
            ]
          }

        })

  }

  // Comportamiento del navbar al hacer scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.dashTitle');
    if(window.scrollY > 0)
      navbar?.classList.add('scrolled');
    else
      navbar?.classList.remove('scrolled');
  }

  goSIR() {
    parent.location.href = "http://192.168.0.107:83";
  }
}
