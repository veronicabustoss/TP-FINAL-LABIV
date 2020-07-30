import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from '../servicios/database.service';
import { AuthService } from '../servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PerfilEspecialistaGuard implements CanActivate ,OnInit {
  constructor(private router: Router, private authService : AuthService,private firestore : AngularFirestore) {}

  bandera : boolean = false;

  ngOnInit()
  {
    let fb = this.firestore.collection('usuarios');
   
    fb.valueChanges().subscribe(usuarios =>{     
      usuarios.forEach( (usuario:any) =>{
        
        if(usuario.correo == this.authService.devolverCorreo() && usuario.perfil == 'especialista')
        {
          this.bandera =  true;
        }
        
  
      });
      
      });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      setTimeout(() => {
        this.ngOnInit();
      }, 3000);
     if(this.bandera)
     {
       return true;
     }
     else
     {
       this.router.navigate(['/']);
       return false;
     }
    
  }
  
}
