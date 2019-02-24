import { Component, OnInit } from '@angular/core';
import { Instruction } from '../model/instruction';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  instructionsArray: Instruction[]=[];


  constructor() {
    this.instructionsArray.push({
        "instructionOrder" : 1,
        "instructionText" : "Primero vamos a batir el huevo y mezclarlo con la leche y la harina"
    });
    this.instructionsArray.push({
         "instructionOrder" : 2,
         "instructionText" : "después añadimos la levadura"
     });
     this.instructionsArray.push({
          "instructionOrder" : 4,
          "instructionText" : "Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga"
      });
    this.instructionsArray.push({
         "instructionOrder" : 3,
         "instructionText" : "Finalmente lo cocinamos en la sartén con fuego alto"
     });
     this.instructionsArray.push({
          "instructionOrder" : 5,
          "instructionText" : "Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga"
      });
      this.instructionsArray.push({
           "instructionOrder" : 6,
           "instructionText" : "Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga"
       });
       this.instructionsArray.push({
            "instructionOrder" : 7,
            "instructionText" : "Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga"
        });

    // console.log(this.instructionsArray);
  }

  ngOnInit() {

     // =[
     //      {
     //          "instructionOrder" : 1,
     //          "instructionText" : "Primero vamos a batir el huevo y mezclarlo con la leche y la harina"
     //      },
     //      {
     //          "instructionOrder" : 2,
     //          "instructionText" : "después añadimos la levadura"
     //      },
     //      {
     //          "instructionOrder" : 3,
     //          "instructionText" : "Finalmente lo cocinamos en la sartén con fuego alto"
     //      }
     //  ];
  }

}
