import { Injectable } from '@angular/core';
import { CardIndex, PlayersHand, CardType, Card } from '../types';
import { templateJitUrl } from '@angular/compiler';

@Injectable()
export class DealHandService {

  playerIndex: number = 0;
  constructor() { }

  public deal(playerNames: Array<string>): Array<PlayersHand> {
    const allCards = this.createCards();
    const shuffledCard = this.shuffleCard(allCards, 40);
    return this.distribute(shuffledCard, playerNames);
  }

  private getSwapPair(max: number): Map<number, number> {
    let swapPair: Map<number, number> = new Map();
    let k: number, v: number;
    do {
      k = Math.round(Math.random() * max);
      v = Math.round(Math.random() * max);
    } while (k === v);
    swapPair.set(k, v);
    return swapPair;
  }

  private createCards(): Array<Card> {
    const allCards: Array<Card> = [];

    for (let type in CardType) {
      if (!isNaN(Number(type))) {
        let i = 0;
        for (let index in CardIndex) {
          allCards.push({ type: Number(type) as CardType, index: index as CardIndex, order: i++ });
        }
      }
    }

    return allCards;
  }

  private shuffleCard(cards: Array<Card>, shuffleTime: number): Array<Card> {
    for (let i = 0; i < shuffleTime; i++) {
      const pair = this.getSwapPair(cards.length - 1);
      const temp = cards[pair.keys().next().value];
      cards[pair.keys().next().value] = cards[pair.get(pair.keys().next().value)];
      cards[pair.get(pair.keys().next().value)] = temp;
    }
    return cards;
  }

  private distribute(cards: Array<Card>, playerNames: Array<string>): Array<PlayersHand> {
    const result: Array<PlayersHand> = [];
    playerNames.forEach(p => result.push({ player: p, cards: [] }));
    cards.forEach((c, i) => {
      if (i % 4 === 0) {
        result[0].cards.push(c);
      } else if (i % 4 === 1) {
        result[1].cards.push(c);
      } else if (i % 4 === 2) {
        result[2].cards.push(c);
      } else if (i % 4 === 3) {
        result[3].cards.push(c);
      }
    });
    return this.orderStack(result);
  }

  private orderStack(hands: Array<PlayersHand>) {    
    hands.forEach(h => {
      let temp: Array<Card> = [];
      temp = [
        ...h.cards.filter(x => x.type === CardType.Spades).sort((a,b) => a.order-b.order),
        ...h.cards.filter(x => x.type === CardType.Hearts).sort((a,b) => a.order-b.order),        
        ...h.cards.filter(x => x.type === CardType.Clubs).sort((a,b) => a.order-b.order),
        ...h.cards.filter(x => x.type === CardType.Diamonds).sort((a,b) => a.order-b.order)];
      h.cards = temp;
    });
    return hands;
  }
}
