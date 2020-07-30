import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection } from "@angular/fire/firestore";
import * as firebase from 'firebase'

// IMPORTO FIREBASE STORAGE
import {AngularFireStorage} from "@angular/fire/storage"

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore, private storage : AngularFireStorage) { }

  private basePath : string = '/fotos';
  private uploadTask : firebase.storage.UploadTask;
  
 public crear(collection: string, data: any) 
 {    
    return this.firestore.collection(collection).add(data);   
  }

  public obtenerPorId(coleccion:string,id:string)
  {
    return this.firestore.collection(coleccion).doc(id).snapshotChanges();
    // El documento que tenga ese id tal cual este ahora, le saca una foto y me lo devuelve
  }

  public obtenerTodos(coleccion:string)
  {
    return this.firestore.collection(coleccion).snapshotChanges();
  }

  public actualizar(coleccion:string, data:any,id:string)
  {
    return this.firestore.collection(coleccion).doc(id).set(data);
  }

  descargarFoto(descarga : any)
  {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${descarga.file.name}`).put(descarga.file);
    
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        
        console.log("se esta descargando la foto");
      },
      (error) => {
        console.log(error)
      },
      () => {
        descarga.url = this.uploadTask.snapshot.downloadURL;
        descarga.name = descarga.file.name;
        
      } )
      
  }


}
