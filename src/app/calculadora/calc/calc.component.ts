import { ReturnStatement } from '@angular/compiler';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent {
   pantalla: string="";
   memoria!: string|null;
   operador: string="";

    numeroPulsado(numero: string){
      if (this.pantalla.length>0 && parseFloat(this.pantalla) <= 1e10)
        this.pantalla += numero;
     
      if (this.pantalla.length==0) this.pantalla = numero;

    }
    operadorPulsado(operador: string){
      if (this.pantalla.length==0) return;

      if (this.memoria!=null && this.operador != null) 
       {
          this.operar();

          this.memoria=this.pantalla;
          
       }

       if (this.memoria==null) this.memoria = this.pantalla;


      this.pantalla="";
      this.operador = operador;      
    }

    puntoPulsado(){
      if (this.pantalla.length>0 && parseFloat(this.pantalla) <= 1e10)
      {  
        if (this.pantalla.indexOf('.') != -1) return;

         this.pantalla +='.';
      }
    }

    igualPulsado(){
      if (this.pantalla.length>0 && this.memoria!=null) 
      {
        this.operar();
      }
      
      this.memoria=null;
      this.operador="";
    }

    backPulsado(){
      if (this.pantalla.length>0)
        this.pantalla = this.pantalla.slice(0,-1);
    }

    operar(){
      
      var v1 = parseFloat(this.memoria!);
      var v2 = parseFloat(this.pantalla);

      switch (this.operador)
      {
            case '+': this.pantalla=(v1 + v2).toString();
            break;
            case '-': this.pantalla=(v1 - v2).toString();
            break;
            case '*': this.pantalla=(v1 * v2).toString();
            break;
      }

    }

    @HostListener('window:keyup',['$event'])
    onKeyUp(event: any){
      if (event.key>='0' && event.key<='9')
      {  
        this.numeroPulsado(event.key);
      } else {
      switch (event.key)
      {
        case 'Backspace':
            this.backPulsado();
            break;
        case '+': 
        case '-': 
        case '*': 
          this.operadorPulsado(event.key);
          break;
        case '.': this.puntoPulsado();
          break;
        case 'Enter':
          event.stopPropagation();
          
          this.igualPulsado();
          break;
      }
    }
    }
}
