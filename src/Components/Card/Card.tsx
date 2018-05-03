import * as React from 'react';

import { IPlayedCard } from '../Table/ITableState';
import { imagePath } from './getCardDetails';

import "./Card.css"

export class Card extends React.Component <{card: IPlayedCard}, {}> {
  public render() {
    const cardUrl = this.props.card.faceDown ? imagePath + "cardBack_green5.png" : this.props.card.card.url;
    return (
      <div className="card">
        <img src={cardUrl} />
      </div>
    );
  }
}
