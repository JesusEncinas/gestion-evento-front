import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormato'
})
export class FechaPipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) return 'Fecha no disponible';

    const fecha = new Date(value);
    const pad = (num: number) => num.toString().padStart(2, '0');

    const year = fecha.getFullYear();
    const month = pad(fecha.getMonth() + 1); // Mes comienza en 0
    const day = pad(fecha.getDate());
    const hours = pad(fecha.getHours());
    const minutes = pad(fecha.getMinutes());
    const seconds = pad(fecha.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
