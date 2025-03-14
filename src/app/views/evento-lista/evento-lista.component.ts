import { Component } from '@angular/core';
import { EventoService } from '../../controllers/evento.service';
import { Evento } from '../../models/evento.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrl: './evento-lista.component.css'
})
export class EventoListaComponent  {
  title = 'gestion-eventos-front';
  eventos : any [] =[];
  evento: Evento = new Evento(); // Inicialización directa

  constructor( private appService:EventoService){

  }
  ngOnInit(): void {
    const token = localStorage.getItem('token'); // Verificar si el token existe
    if (!token) {
      Swal.fire('Acceso denegado', 'Por favor, inicia sesión para continuar.', 'warning');
      return; // Detener la ejecución si no hay token
    }
    this.getAll();
    this.evento = {
      id: null,
      nombreEvento: '',
      completado: false,
      fechaEvento: new Date() // Almacenar como Date
    };
    
  } 

  /**
   * 🔹 Convierte una fecha de `Date` al formato `yyyy-MM-ddTHH:mm`
   */


  formatDateToInput(date: any): string {
    if (!date) return '';
  
    const fecha = new Date(date);
    if (isNaN(fecha.getTime())) return ''; // Verificar que la fecha sea válida
  
    const pad = (num: number) => num.toString().padStart(2, '0');
  
    const year = fecha.getFullYear();
    const month = pad(fecha.getMonth() + 1);
    const day = pad(fecha.getDate());
    const hours = pad(fecha.getHours());
    const minutes = pad(fecha.getMinutes());
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  /**
   * 🔹 Obtiene todos los eventos y les da formato a las fechas.
   */
  getAll() {
    this.appService.getAll().subscribe((data: Evento[]) => {
      this.eventos = data.map(evento => ({
        ...evento,
        fechaEvento: this.formatDateToInput(evento.fechaEvento) // Convertimos la fecha correctamente
      }));
    });
  }

  /**
   * 🔹 Guarda un evento (crea o actualiza).
   */
  save() {

    if (!this.evento.nombreEvento || typeof this.evento.nombreEvento !== 'string' || this.evento.nombreEvento.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre requerido',
        text: 'Por favor, ingrese un nombre para el evento.',
      });
      return; // Detener ejecución si el nombre no es válido
    }
    if (typeof this.evento.fechaEvento === 'string') {
      this.evento.fechaEvento = new Date(this.evento.fechaEvento); // Convertimos el string a Date antes de enviarlo
    }
  
    // if (this.evento.id) {
    //   this.appService.update(this.evento.id!, this.evento).subscribe(() => this.getAll());
    // } else {
    //   this.appService.create(this.evento).subscribe(() => this.getAll());
    // }

    if (this.evento.id) {
      this.appService.update(this.evento.id!, this.evento).subscribe(() => {
        this.getAll();
        Swal.fire({
          icon: 'success',
          title: 'Evento actualizado',
          text: 'El evento se actualizó correctamente.',
        });
      });
    } else {
      this.appService.create(this.evento).subscribe(() => {
        this.getAll();
        Swal.fire({
          icon: 'success',
          title: 'Evento creado',
          text: 'El evento se ha registrado exitosamente.',
        });
      });
    }
  
    // Reiniciamos el formulario
    this.evento = {
      id: null,
      nombreEvento: '',
      completado: false,
      fechaEvento: new Date()
    };
  }

  /**
   * 🔹 Edita un evento sin mutación directa.
   */
  edit(evento: Evento): void {
    this.evento = { ...evento }; // Copia para evitar modificar el original
  }

  /**
   * 🔹 Elimina un evento por ID.
   */
  // delete(evento: Evento): void {
  //   this.appService.delete(evento.id!).subscribe(() => this.getAll());
  // }

  delete(evento: Evento): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el evento: "${evento.nombreEvento}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appService.delete(evento.id!).subscribe(() => {
          this.getAll();
          Swal.fire('Eliminado', 'El evento ha sido eliminado.', 'success');
        });
      }
    });
  }

  /**
   * 🔹 Resetea el formulario.
   */
  private resetEvento(): void {
    this.evento = new Evento();
  }
}