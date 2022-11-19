import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SesionUserService } from '../../services/sesion-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService, private fb : FormBuilder, private localServ: SesionUserService) { }

  ngOnInit(): void {}

  formularioLogin: FormGroup = this.fb.group({

    mail: [],
    password: []

  })

  singIn(){

    const email = this.formularioLogin.value.mail;
    const password = this.formularioLogin.value.password;
    console.log(email);
    console.log(password);

    this.authService.login({email, password}).
    then((data)=>
      {this.localServ.instanciaEnLocalHost("https://www.pngmart.com/files/21/Account-User-PNG-Photo.png", data.user?.email!, data.user?.uid!), 
      this.router.navigateByUrl("/auth/inicio");
    })

  }

  googleAuth(){
    this.authService.googleAuth();
  }

  twitterAuth(){
    this.authService.twitterAuth();
  }

  facebookAuth(){
    this.authService.facebookAuth();
  }

  githubAuth(){
    this.authService.githubAuth();
  }

  cambiarContra(){
    this.router.navigateByUrl("/auth/cambiar-contra")
  }

  registro(){
    this.router.navigateByUrl("/auth/registrar")
  }

}
