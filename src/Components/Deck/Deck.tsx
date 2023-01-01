import * as React from 'react';

import { Card } from '../Card/Card';
import { EmptyPile } from '../Card/EmptyPile';
import { ICardDetails, imagePath } from '../Card/getCardDetails';
import { IDiscards } from '../Table/ITableState';

import './Deck.css';

export class Deck extends React.Component <{deck: ICardDetails[], discards: IDiscards}, {}> {
    public render() {
    return (
        <div className="deck">
            <div className="draw-pile">
                {this.props.deck.length > 0 
                    ? <img src={imagePath + "cardBack_green5.png"} draggable={false} />
                    : <EmptyPile />
                }
            </div>
            <div className="discard-pile">
                {this.props.discards.showing > 2 &&
                    <div style={{position: "absolute", left: 150 + "px"}}>
                        <Card card={{card: this.props.discards.cards[this.props.discards.cards.length - 3]}} />
                    </div>
                }
                {this.props.discards.showing > 1 &&
                    <div style={{position: "absolute", left: (150 + 30 * (this.props.discards.showing - 2)) + "px"}}>
                        <Card card={{card: this.props.discards.cards[this.props.discards.cards.length - 2]}} />
                    </div>
                }
                {this.props.discards.showing > 0 &&
                    <div style={{position: "absolute", left: (150 + 30 * (this.props.discards.showing - 1)) + "px"}}>
                        <Card card={{card: this.props.discards.cards[this.props.discards.cards.length - 1]}} />
                    </div>
                }
            </div>
        </div>
    );
  }
}
