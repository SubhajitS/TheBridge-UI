import { Component, OnInit } from '@angular/core';
import { PlayersHand } from '../types';
import { DealHandService } from './deal-hand.service';

@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.scss']
})
export class BridgeComponent implements OnInit {
  hands: Array<PlayersHand>;

  constructor(private dealHand: DealHandService) { }

  ngOnInit() {
    this.hands = this.dealHand.deal(['North', 'East', 'South', 'West']);
  }

}
