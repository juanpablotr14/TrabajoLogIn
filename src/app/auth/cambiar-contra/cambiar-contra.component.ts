import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-contra',
  templateUrl: './cambiar-contra.component.html',
  styleUrls: ['./cambiar-contra.component.css']
})
export class CambiarContraComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  volver(){
    this.router.navigateByUrl("/auth/home")
  }

}
