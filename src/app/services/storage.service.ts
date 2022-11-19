import { Injectable, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  images : string[];

  constructor(private storage : Storage) { 
    this.images = [];
  }

  OnInit(){
    this.getImages();
  }

  uploadImage( $event : any){

    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref( this.storage , `images/${ file.name }`);

    uploadBytes(imgRef, file)
    .then(response => console.log(response))
    .catch(error => console.log(error));

  }

  getImages(){

    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
    .then( async response => {

      console.log(response);
      this.images = [];

      for(let item of response.items){
        const url = await getDownloadURL(item);
        this.images.push(url);
      }

    })
    .catch(error => console.log(error))
  }

}
