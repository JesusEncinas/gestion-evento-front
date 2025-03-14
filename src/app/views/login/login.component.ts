import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token); // Guarda el token
        Swal.fire(
          'Inicio de sesión exitoso',
          'Has iniciado sesión correctamente',
          'success'
        );
        // Redirigir al usuario a la URL de eventos
        this.router.navigate(['/eventos']);
      },
      error: () => {
        Swal.fire('Error', 'Credenciales inválidas', 'error');
      },
    });
  }

}
