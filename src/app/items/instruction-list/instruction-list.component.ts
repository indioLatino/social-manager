import {Component, OnInit, Input} from '@angular/core';
import {Instruction} from "../../model/instruction";
import {Item} from "../../model/item";
import {ItemService} from "../services/item.service";

@Component({
  selector: 'app-instruction-list',
  templateUrl: './instruction-list.component.html',
  styleUrls: ['./instruction-list.component.css']
})
export class InstructionListComponent implements OnInit {
  private item: Item = new Item();
  private instructionArray: Instruction[] = [];
  private sortedInstructionArray: Instruction[] = [];
  private currentInstructionPosition: number = 1;
  private currentInstruction: Instruction = new Instruction();
  private screenInstructionArray: Instruction[] = [];
  private chunkFactor: number = 3; //Number from where the sortedInstructionArray is going to be chunk
  private itemService: ItemService;

  constructor(itemService: ItemService) {
    this.itemService = itemService;
  }

  ngOnInit() {
    this.item = this.itemService.item;
    this.extractInstructionsList();
  }

  chunkSortedInstruction(position) {
    if ((position >= this.chunkFactor - 1) && (position < this.sortedInstructionArray.length)) {
      this.screenInstructionArray = [];
      let startLoop = position - 2;
      let endLoop = startLoop + this.chunkFactor;
      for (var i = startLoop; i < endLoop; i++) {
        this.screenInstructionArray.push(this.sortedInstructionArray[i]);
      }

    }
  }

  //
  changeCurrentInstruction(position) {
    this.currentInstructionPosition = position;
    this.currentInstruction = this.sortedInstructionArray[this.currentInstructionPosition - 1];
    this.chunkSortedInstruction(position);
  }

  private extractInstructionsList(): void {
    console.log("extractInstructionsList");
    this.instructionArray = this.item.instructions;
    this.sortedInstructionArray = this.instructionArray.sort((a, b) => a.instructionOrder - b.instructionOrder);
    this.currentInstruction = this.sortedInstructionArray[this.currentInstructionPosition - 1];
    for (var i = 0; i < this.chunkFactor; i++) {
      this.screenInstructionArray.push(this.sortedInstructionArray[i]);
    }
  }

}
