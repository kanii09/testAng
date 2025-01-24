import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconModule } from "../../../../../projects/icon/src/lib/icon/icon.module";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-icon-texts-col',
  imports: [CommonModule, IconModule],
  templateUrl: './icon-texts-col.component.html',
  styleUrl: './icon-texts-col.component.css'
})
export class IconTextsColComponent {
  @Input() icon!: string;
  @Input() text?: string = ''; 
  @Input() textColor: string = 'text-textColour'; // Default text color
  @Input() hoverColor: string = 'text-textColour'; // Default text color
  @Input() iconColor: string = 'text-textColour'; // Default text color
  @Output() onClick = new EventEmitter<void>(); // Event emitter for button click
}
