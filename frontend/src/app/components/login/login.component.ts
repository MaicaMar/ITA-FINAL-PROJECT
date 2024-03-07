import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    SignInComponent,
    FormsModule,
    SpinnerComponent,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) {}

  login() {

    // Validamos que el usuario ingrese datos
    if (this.username == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    // Creamos el objeto/body
    const user: User = {
      username: this.username,
      email: '', // Email requerido por interface pero no lo usamos en el login
      password: this.password
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token) => {
        // Almacenamos token en el localStorage
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    })
  }
}
