import { Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import {AngularFirestore,AngularFirestoreCollection } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public estaLogeado = false;
  nombre ;
  @Input() user : any;
  imagen;

  listaUsuarios = [];

  public user$ : Observable<any> = this.authS.AFauth.user;
  public seRegistro = localStorage.getItem('token');
  bandera = true;
  constructor(public authS : AuthService,
    private firestore : AngularFirestore,
    private router : Router,
    public jwtHelper: JwtHelperService) { }

  async ngOnInit() {
    
    const user = await this.authS.getCurrentUser();
    this.user = user;

    if(this.user)
    { 
      this.estaLogeado = true;
    }

    const token = localStorage.getItem('token');

    const payload = this.jwtHelper.decodeToken(token);


    let fb = this.firestore.collection('usuarios');
  
    fb.valueChanges().subscribe(datos =>{     
      this.listaUsuarios = [];
      datos.forEach( (dato:any) =>{
        
      this.listaUsuarios.push(dato);

      });
      
    });
  
}


/** Que tomo en legislacion pp:
 * - Cuando se elije un presidente, que pasa cuando muere el presidente y el vicepresidente
 * - Como se elije los nombres, los apellidos, que pasa co
 * - Constitucion nacional : articulo 30 
 * - Poder ejecutivo, consejo de la magistratura
 * - Jurado de enjuizamiento
 * - Atributos de la personalidad (caracteresticas y cuales eran)
 * - Contratos  
 */


  deslogearse()
  {
    this.bandera = true;
    this.authS.logout();
    this.estaLogeado = false;
    this.nombre = null;
    this.imagen = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
  

}
