import { Component, Input, OnInit } from '@angular/core';
import { EagleData } from '../../model/EagleData.interface';
import { DatosLectura } from '../../model/DatosLectura.interface';

@Component({
  selector: 'eagle-info',
  templateUrl: './eagle-info.component.html',
  styleUrl: './eagle-info.component.css'
})
export class EagleInfoComponent  implements OnInit {

  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() dataEagle: EagleData[] = [];
  datosLectura?: DatosLectura; 

  constructor() {}

  ngOnInit(): void {
    
  }

  datosLecturas(dataEagle: EagleData[]): DatosLectura {
    let datos: DatosLectura = new DatosLectura()
    datos.lecturas = dataEagle.length;
    datos.rechazos = dataEagle.filter( lectura => { return lectura.bankidx == 0 }).length;
    datos.barcodesVacios = dataEagle.filter( lectura => { return lectura.barcode == ''}).length;
    return datos;
  }

  getRechazos(dataEagle: EagleData[]): number {
    return dataEagle.filter( lectura => { return lectura.bankidx == 0 }).length;
  }

  getNoLeidos(dataEagle: EagleData[]): number {
    return dataEagle.filter( lectura => { return lectura.barcode == '' }).length;
  }
}
