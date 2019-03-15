import { Component, OnInit , Input } from '@angular/core';
import { Instruction } from '../model/instruction';
import { takeWhile } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-instruction-list',
  templateUrl: './instruction-list.component.html',
  styleUrls: ['./instruction-list.component.css']
})
export class InstructionListComponent implements OnInit {
  private _instructionArray = new BehaviorSubject<Instruction[]>([]);
  @Input()
  // instructionArray: Instruction[]=[];
  set instructionArray(value){
      // set the latest value for _data BehaviorSubject
      this._instructionArray.next(value);
  };

  get instructionArray() {
      // get the latest value from _data BehaviorSubject
      return this._instructionArray.getValue();
  }

  sortedInstructionArray: Instruction[]=[];
  currentInstructionPosition:number=1;
  currentInstruction:Instruction=new Instruction();
  screenInstructionArray: Instruction[]=[];
  chunkFactor: number=3; //Number from where the sortedInstructionArray is going to be chunk

  constructor() {

   }

  ngOnInit() {
    this._instructionArray
            // .takeWhile(() => this.screenInstructionArray==[])
            .subscribe(x => {
                // this.groupPosts = this.groupByCategory(this.instructionArray);
                console.log("instructionArray onChange");
                console.log(this.instructionArray);
                this.sortedInstructionArray=this.instructionArray.sort((a, b) => a.instructionOrder - b.instructionOrder);
                this.currentInstruction = this.sortedInstructionArray[this.currentInstructionPosition-1];
                for(var i=0;i<this.chunkFactor;i++){
                  this.screenInstructionArray.push(this.sortedInstructionArray[i]);
                }
            });
  }

  chunkSortedInstruction(position){
    if((position>=this.chunkFactor-1)&&(position<this.sortedInstructionArray.length)){
      this.screenInstructionArray=[];
      let startLoop=position-2;
      let endLoop=startLoop+this.chunkFactor;
      for(var i=startLoop;i<endLoop;i++){
        this.screenInstructionArray.push(this.sortedInstructionArray[i]);
      }

    }
  }
    //
  changeCurrentInstruction(position){
    this.currentInstructionPosition=position;
    this.currentInstruction = this.sortedInstructionArray[this.currentInstructionPosition-1];
    this.chunkSortedInstruction(position);
  }

}
