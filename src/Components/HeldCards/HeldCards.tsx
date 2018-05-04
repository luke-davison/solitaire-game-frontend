import * as React from 'react';

import { Card } from '../Card/Card';
import { ICardDetails } from '../Card/getCardDetails';

import './HeldCards.css';

export class HeldCards extends React.Component <{heldCards: ICardDetails[], mouse: {x: number, y: number}}, {}> {
    public render() {
        return (
            <div className="held-cards">
                {this.props.heldCards.map((heldCard, i) => {
                    const position = {left: (this.props.mouse.x - 75) + "px", top: (this.props.mouse.y + 30 + 30 * i) + "px"}
                    return (
                        <div className="held-card" key={i} style={position} >
                            <Card card={{card: heldCard}} />
                        </div>
                    )
                })}
            </div>
        )
    }
}
