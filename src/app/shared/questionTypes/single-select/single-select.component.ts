import { Component, Input } from '@angular/core';
import { IconTextComponent } from "../../components/icon-text/icon-text.component";
import { FormsModule } from '@angular/forms';
import { IconModule } from "../../../../../projects/icon/src/lib/icon/icon.module";


@Component({
  selector: 'app-single-select',
  standalone: true,
  imports: [IconTextComponent, FormsModule, IconModule],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.css'
})
export class SingleSelectComponent {
  @Input() options: string[] = [];
  newOption: string = '';  // Store the new option input
  isAdding: boolean = false;  // Toggle input field visibility

  // Function to add the option to the list
  addOption() {
    if (this.newOption.trim()) {
      this.options.push(this.newOption.trim());
      this.newOption = '';
      this.isAdding = false;
    }
  }

  // Function to cancel adding and reset state
  cancelAdd() {
    this.newOption = '';
    this.isAdding = false;
  }

  // Show input field
  showInput() {
    this.isAdding = true;
  }
}
