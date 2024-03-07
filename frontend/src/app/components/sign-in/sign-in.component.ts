import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    HttpClientModule,
    SpinnerComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    private http: HttpClient
    ) {}

    addUser() {

      // Validamos que el usuario ingrese valores
      if (this.username == '' || this.email == '' || this.password == '' || this.confirmPassword == '') {
        this.toastr.error('Todos los campos son obligatorios', 'Error');
        return;
      }

      // Validamos que las password sean iguales
      if (this.password != this.confirmPassword) {
        this.toastr.error('Las passwords ingresadas son distintas', 'Error');
        return;
      }

      // Creamos el objeto
      const user: User = {
        username: this.username,
        email: this.email,
        password: this.password
      }

      this.loading = true;
      this._userService.signIn(user).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success(`El usuario ${this.username} fue registrado con éxito`, 'Usuario resgistrado');
          this.router.navigate(['/login']);
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);
        },
        complete: () => console.info('complete')
      })
    }
}
