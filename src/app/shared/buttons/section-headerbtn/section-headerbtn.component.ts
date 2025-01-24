import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconComponent } from "../../../../../projects/icon/src/lib/icon/icon.component";

@Component({
  selector: 'app-section-headerbtn',
  imports: [IconComponent],
  templateUrl: './section-headerbtn.component.html',
  styleUrl: './section-headerbtn.component.css'
})
export class SectionHeaderbtnComponent {
  @Input() icon!: string; // FontAwesome icon to display
  @Input() text: string = ''; // Text to display on the button
  @Output() onClick = new EventEmitter<void>(); // Event emitter for button click
}
