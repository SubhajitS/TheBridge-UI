import { Component, OnInit } from '@angular/core';
import { PlayersHand } from './types';
import { DealHandService } from './bridge/deal-hand.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dealHand: DealHandService) { }

  title = 'PWA-Example';
  hands: Array<PlayersHand>;

  ngOnInit() {
    this.hands = this.dealHand.deal(['North', 'East', 'South', 'West']);
    console.log(this.hands);
  }
}
