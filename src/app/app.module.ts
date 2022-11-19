import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './auth/home/home.component';
import { CambiarContraComponent } from './auth/cambiar-contra/cambiar-contra.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { InicioComponent } from './auth/inicio/inicio.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment.prod';
import { ReactiveFormsModule } from '@angular/forms';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { provideDatabase } from '@angular/fire/database';
import { getDatabase } from 'firebase/database';
import { provideStorage,getStorage } from '@angular/fire/storage';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CambiarContraComponent,
    RegistrarComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    provideDatabase(()=>
      getDatabase()
    ),
    provideFirebaseApp(()=>
      initializeApp(environment.firebaseConfig)
    ),
    provideAuth(()=>
      getAuth()
    ),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
