import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionUserService {

  constructor( private router: Router) { }

  instanciaEnLocalHost( image: String, mail: String, uid: String){
    localStorage.setItem("user", JSON.stringify([image, mail, uid]));
  }

  validarCuentaActiva(): boolean{
    
    if(localStorage.getItem("user") != null) {

      return true

    }else{

      return false

    }

  }

  eliminarInstanciaLocalHost(){
    if( localStorage.getItem("user")){

      this.router.navigateByUrl("/")
      localStorage.removeItem("user")

    }else{

      console.log("No existe nadie Registrado!")

    }
    
  }

}
