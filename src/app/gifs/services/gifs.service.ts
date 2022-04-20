import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = "hSmAcvWzEpsZ3Y1yR8IYBy2gBxRbLVIc";
  private _historial: string[] = [];

  public resultados:any[] = [];

  get historial () {
    return [...this._historial];
  }

  constructor(private http:HttpClient){}
  
  buscarGifs(query:string){
    if(query.length > 0){
      query = query.trim().toLowerCase();

      if(!this._historial.includes(query)){
        this._historial.unshift(query);
        this._historial = this._historial.splice(0,9);
      }
      
      this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${ this.apiKey }&q=${ query }&limit=10`)
        .subscribe( (response:any) =>{
          console.log(response.data);
          this.resultados = response.data;
        })
  
      //console.log(this._historial);
    }
    
    
  }
}
