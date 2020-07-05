import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardType, CardIndex } from '../../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

  @Input() index: CardIndex;
  @Input() type: CardType;

  icon: { color: '#FF0000' | '#000', iconUnicode: '♣' | '♦' | '♥' | '♠' } = undefined;

  private readonly iconSet: Array<{ color: '#FF0000' | '#000', iconUnicode: '♣' | '♦' | '♥' | '♠' }> = [];

  constructor() {
    this.iconSet.push({ iconUnicode: '♠', color: '#000' });
    this.iconSet.push({ iconUnicode: '♥', color: '#FF0000' });
    this.iconSet.push({ iconUnicode: '♦', color: '#FF0000' });
    this.iconSet.push({ iconUnicode: '♣', color: '#000' });
  }

  ngOnInit(): void {
  }

  ngOnChanges(SimpleChanges: SimpleChanges) {
    if (this.index && this.type !== undefined) {
      this.icon = this.iconSet[this.type];
    }
  }
}
