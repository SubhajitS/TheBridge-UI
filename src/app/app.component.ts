import { Component } from '@angular/core';
import { CardIndex, CardType } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PWA-Example';
  indexes = [
    CardIndex.Ace,
    CardIndex.King,
    CardIndex.Queen,
    CardIndex.Jack,
    CardIndex.Ten,
    CardIndex.Nine,
    CardIndex.Eight,
    CardIndex.Seven,
    CardIndex.Six,
    CardIndex.Five,
    CardIndex.Four,
    CardIndex.Three,
    CardIndex.Two];
  typeHearts = CardType.Hearts;
  typeSpades = CardType.Spades;
  typeClubs = CardType.Clubs;
  typeDiamonds = CardType.Diamonds;
}
