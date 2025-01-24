import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true  // Ensuring compatibility with standalone components
})
export class SafeHtmlPipe implements PipeTransform {
  private _domSanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    return this._domSanitizer.bypassSecurityTrustHtml(value);
  }
}
