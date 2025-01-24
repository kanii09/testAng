import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff < oneDay && date.getDate() === now.getDate()) {
      // If the date is today
      return `today, ${this.formatTime(date)}`;
    } else if (diff < 2 * oneDay && date.getDate() === now.getDate() - 1) {
      // If the date is yesterday
      return `yesterday, ${this.formatTime(date)}`;
    } else {
      // If the date is older
      return `${date.getDate()} ${this.getMonthName(date)}, ${this.formatTime(date)}`;
    }
  }

  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${period}`;
  }

  private getMonthName(date: Date): string {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[date.getMonth()];
  }
}
