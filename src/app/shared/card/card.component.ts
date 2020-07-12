import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { CardType, CardIndex } from '../../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

  @Input()
  get index(): CardIndex {
    return this._index;
  }
  set index(value: CardIndex) {
    this._index = CardIndex[value];
  }
  @Input() type: CardType;
  @Input() display: 'show' | 'hide' = 'show';

  @HostListener('document:click', ['$event'])
  outsideClick(event) {
    if(this.cardRef.nativeElement.contains(event.target)) {
      if (this.display === 'hide') {
        event.preventDefault();
        return;
      }
      this.selected = !this.selected;
    } else {
      this.selected = false;
    }
  }

  selected: boolean = false;

  private _index: CardIndex;

  icon: { color: '#FF0000' | '#000', iconUnicode: '♣' | '♦' | '♥' | '♠' } = undefined;

  private readonly iconSet: Array<{ color: '#FF0000' | '#000', iconUnicode: '♣' | '♦' | '♥' | '♠' }> = [];

  constructor(private cardRef: ElementRef) {
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
