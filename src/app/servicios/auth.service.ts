import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user : User;

  constructor(public AFauth : AngularFireAuth,
    private router : Router,
    private firestore : AngularFirestore,) { }

  login(correo : string, contraseña : string){

    return new Promise((resolve, rejected) => {
  
    this.AFauth.signInWithEmailAndPassword(correo, contraseña)
    
    .then (user => resolve(user.user.getIdToken().then(token => {
      localStorage.setItem('token',token);
      localStorage.setItem('usuario',correo);
      this.router.navigate(['/']);
    })))
    .catch(err => rejected(err))
  
    });
  
  }
  
  registrarUsuario(correo : string, contraseña : string)
  {
    return new Promise((resolve, rejected) => {
  
      this.AFauth.createUserWithEmailAndPassword(correo, contraseña)
      .then ( usuario => {

        console.log(usuario);
        this.AFauth.user.subscribe(dato => {
          console.log(dato);
        })
        /* user => resolve(user.user.getIdToken().then(token => {
        localStorage.setItem('token',token);
        this.AFauth.signOut();*/
      })
      
      .catch(err => rejected(err))
    
      });
  }

  async logout()
  {
    await this.AFauth.signOut();
  }

 getCurrentUser()
  {
    return this.AFauth.authState.pipe(first()).toPromise();
  }

  public devolverCorreo()
  {
    let correo = localStorage.getItem('usuario');
    return correo;
  }

  public comprobarPerfil(perfil : string, correo : string)
  {
    let fb = this.firestore.collection('usuarios');
   
    fb.valueChanges().subscribe(usuarios =>{     
      usuarios.forEach( (usuario:any) =>{
        
        if(usuario.correo == correo && usuario.perfil == perfil)
        {
          return true;
        }
  
      });
      
    });
  }
  
  

}
