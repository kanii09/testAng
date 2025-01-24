import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconTextComponent } from "../../components/icon-text/icon-text.component";
import { FormsModule } from '@angular/forms';
import { IconModule } from "../../../../../projects/icon/src/lib/icon/icon.module";
import { OptionItem } from '../../../core/models/optionItem/option-item';

@Component({
  selector: 'app-multi-choice',
  imports: [IconTextComponent, FormsModule, IconModule],
  templateUrl: './multi-choice.component.html',
  styleUrl: './multi-choice.component.css'
})
export class MultiChoiceComponent implements OnInit {
  optionBeingEdited: OptionItem | null = null;
  @Input() options: OptionItem[] = [];
  isAdding: boolean = false;  // Toggle input field visibility

  @Output() saveOptionEvent = new EventEmitter<OptionItem>;

  ngOnInit(): void {
    console.log('OPTIONS ', this.options)
  }

  // Function to add the option to the list
  addOption() {
    if (!this.options) return;
    let newId: number;
    do {
      newId = OptionItem.generateId();
    } while (this.options?.some(option => option.id === newId));

    const newOption = new OptionItem({ id: newId, variableName: '', name: this.optionBeingEdited?.name });
    if(newOption) {

      this.saveOptionEvent.emit(newOption);
      this.cancelAdd();
    }
  }

  // Function to cancel adding and reset state
  cancelAdd() {
    this.optionBeingEdited = null;
    this.isAdding = false;
  }

  // Show input field
  showInput() {
    if (!this.options) return;
    let newId: number;
    do {
      newId = OptionItem.generateId();
    } while (this.options?.some(option => option.id === newId));

    this.optionBeingEdited = new OptionItem({ id: newId, variableName: '', name: '' });
    this.isAdding = true;
  }
}
