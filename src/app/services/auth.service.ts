import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider , createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@firebase/auth';
import { Auth } from '@angular/fire/auth';
import { SesionUserService } from './sesion-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router, private userAuth: Auth, private localServ: SesionUserService) { }

  //Providers Internos

  register({mail, password1} : any ){
    console.log(mail, password1)
    this.auth.createUserWithEmailAndPassword(mail, password1)
    .then((user)=>{
      this.sendEmail(user.user);
    })
    return
  }

  sendEmail(user : any){

    user.sendEmailVerification()
    .then((rest : any)=>{
      alert("Correo Enviado con exito!")
    }).
    catch((rr : any) =>{
      alert("Error al enviar correo")
    })
    return
  }

  login({email, password} : any ){

    return signInWithEmailAndPassword( this.userAuth , email, password);

  }

  loginExitoso(data : any){

    console.log("Login con exito: "+"\nUser: "+JSON.stringify( data.user ))
    if (data.user?.mail){

      this.localServ.instanciaEnLocalHost(data.user?.photoURL!, data.user?.email!, data.user.uid!)

    }else{

      this.localServ.instanciaEnLocalHost(data.user?.photoURL!, data.user?.displayName!, data.user.uid!)

    }

    this.router.navigateByUrl("/auth/inicio")

  }

  //Providers Externos (google, twitter, facebook, github)

  googleAuth(){
    return this.googleAuthLogin(new GoogleAuthProvider())
  }

  facebookAuth(){
    return this.facebookAuthLogin(new FacebookAuthProvider)
  }

  githubAuth(){
    return this.githubAuthLogin(new GithubAuthProvider)
  }

  githubAuthLogin(provider : any){

    return this.auth.signInWithPopup(provider).then(result =>{
      console.log("Sesion Iniciada con Exito", result)
      this.loginExitoso(result)
    }).catch((error) =>{
      console.log(error)
    })
    
  }

  twitterAuth(){
    return this.twitterAuthLogin(new TwitterAuthProvider())
  }

  twitterAuthLogin(provider : any){
    return this.auth.signInWithPopup(provider).then(result =>{
      console.log("Sesion Iniciada con Exito", result)
      this.loginExitoso(result)
    }).catch((error) =>{
      console.log(error)
    })
  }

  facebookAuthLogin(provider : any){
    
    return this.auth.signInWithPopup(provider).then(result =>{
      console.log("Sesion Iniciada con Exito", result)
      this.loginExitoso(result)
    }).catch((error) =>{
      console.log(error)
    })

  }

  googleAuthLogin(provider: any){

    return this.auth.signInWithPopup(provider).then(result =>{
      console.log("Sesion Iniciada con Exito", result)
      this.loginExitoso(result)
    }).catch((error) =>{
      console.log(error)
    })

  }

  async logOut(){
    this.auth.signOut();
  }

  getStateUser(){
    return this.auth.authState;
  }

}
