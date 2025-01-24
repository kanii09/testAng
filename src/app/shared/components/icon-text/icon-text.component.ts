import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconModule } from "../../../../../projects/icon/src/lib/icon/icon.module";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-text',
  imports: [IconModule, CommonModule],
  templateUrl: './icon-text.component.html',
  styleUrl: './icon-text.component.css'
})
export class IconTextComponent {
  @Input() icon!: string;
  @Input() text?: string = ''; 
  @Input() textColor: string = 'text-white'; // Default text color
  @Input() iconColor: string = 'text-white'; // Default text color
  @Output() onClick = new EventEmitter<void>(); // Event emitter for button click
}