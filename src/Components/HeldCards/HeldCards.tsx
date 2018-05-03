import * as React from 'react';

import { Card } from '../Card/Card';
import { ICardDetails } from '../Card/getCardDetails';

import './HeldCards.css';

export class HeldCards extends React.Component <{heldCards: ICardDetails[], mouse: {x: number, y: number}}, {}> {
    public render() {
        const position = {left: (this.props.mouse.x - 75) + "px", top: (this.props.mouse.y + 30) + "px"}
        return (
            <div className="held-cards" style={position}>
                {this.props.heldCards.map(heldCard => (
                    <div className="held-card">
                        <Card card={{card: heldCard}} />
                    </div>
                ))}
            </div>
        )
    }
}
