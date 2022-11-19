import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private router:Router, private fb : FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {
  }

  formularioRegistro: FormGroup = this.fb.group({

    nombre:["",[Validators.required]],
    apellidos:["",[Validators.required]],
    mail: ["",[Validators.required]],
    password1: ["",[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    password2: ["",[Validators.required]]

  })

  validarForm() : boolean{

    const password1 = this.formularioRegistro.value.password1;
    const password2 = this.formularioRegistro.value.password2;

    if(password1 != password2){

      alert("Las contraseñas deben de ser iguales!")
      return false

    }else if(!this.formularioRegistro.controls['password1'].valid){

      alert("La contraseña debe de tener minimo 7 caracteres, un caracter especial y una mayuscula")
      return false

    }else if(!this.formularioRegistro.valid){

      alert("Todos los campos son obligatorios y el correo debe de ser valido")
      return false

    }

    return true

  }

  registrar(){

    const mail = this.formularioRegistro.value.mail;
    const password1 = this.formularioRegistro.value.password1;

    if(this.validarForm()){

      this.authService.register({mail, password1});
      alert("Registro con exito!")

    }

  }

  volver(){
    this.router.navigateByUrl("/auth/home")
  }
  
}
