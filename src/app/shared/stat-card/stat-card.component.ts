import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent {

  @Input() label = '';
  @Input() value = '';
  @Input() change = '';
  @Input() comparison = 'vs. last hour';

  @Input()
  type: 'blue' | 'violet' | 'red' | 'cyan' = 'blue';

  @Input() icon = 'car';

}