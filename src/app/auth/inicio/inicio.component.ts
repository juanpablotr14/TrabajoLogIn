import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Database, ref, set, update, onValue, remove } from '@angular/fire/database';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  mostrarRegistro : boolean = false;
  eliminarMostrar : boolean = false;
  mostrarLista : boolean = true;
  public archivos : any[];
  value : any;

  constructor( private router:Router, private authService:AuthService, private database : Database) { 
    this.archivos = [];
  }

  nombre : string = ""
  uid : string = ""
  image : string = ""
  mail: string = ""

  ngOnInit(): void {

    const data = JSON.parse(localStorage.getItem("user")!)
    this.nombre = data[1]
    this.uid = data[2]
    this.image = data[0]
    this.leerData();

  }

  registroUser( value : any ){

    set(ref(this.database, 'users/' + value.username), {

      nombreUsuario : value.username,
      nombre : value.nombre,
      apellidos : value.apellidos,
      edad : value.edad,
      telefono : value.telefono,
      direccion : value.direccion,
      correo : value.correo,
      profile_picture :  value.imagen

    });

    alert("Usuario Creado");

  }

  updateUser( value : any ){

    update(ref(this.database, 'users/' + value.username), {

      nombreUsuario : value.username,
      nombre : value.nombre,
      apellidos : value.apellidos,
      edad : value.edad,
      telefono : value.telefono,
      direccion : value.direccion,
      //correo : value.correo,
      profile_picture : value.imagen

    });

    alert("Usuario Actualizado");
  }

  leerData(){

    const starCountRef = ref( this.database, 'users/');

    onValue(starCountRef, (snapshot) =>{
      const data = snapshot.val();
      this.value = Object.values(data);
    });

  }

  async eliminarUser(value : any){
    console.log(value.nombre);
    await remove(ref(this.database, `users/${ value.nombre}` ));
    alert("Usuario Eliminado!")
  }

  visibilidadLista(){
    this.mostrarLista = true
    this.mostrarRegistro = false
    this.eliminarMostrar = false
  }

  visibilidadRegistro(){
    this.mostrarLista = false
    this.mostrarRegistro = true
    this.eliminarMostrar = false
  }

  visibilidadEliminar(){
    this.mostrarLista = false
    this.mostrarRegistro = false
    this.eliminarMostrar = true
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl("/auth/auth")
  }

}
