import * as React from 'react';

import { Card } from '../Card/Card';
import { IPlayedCard } from '../Table/ITableState';

import './PlayedCards.css';

export class PlayedCards extends React.Component <{playedCards: IPlayedCard[][]}, {}> {
    public render() {
    return (
      <div className="played-cards">
        {this.props.playedCards.map((column, columnNo: number) => {
            const columnStyle = {width: "150px", maxWidth: (1 / this.props.playedCards.length * 100) + "%"}
            return (
                <div className="played-cards-column" key={columnNo} style={columnStyle} >
                    {column.map((card, i: number) => (
                        <div key={i} className="played-card" style={{position: "absolute", top: (i * 30 + 220) + "px"}}>
                            <Card card={card} />
                        </div>
                    ))}
                </div>
            )
        })}
      </div>
    );
  }
}
