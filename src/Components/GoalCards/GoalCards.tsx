import * as React from 'react';

import { Card } from '../Card/Card';
import { EmptyPile } from '../Card/EmptyPile';
import { IGoalCards } from '../Table/ITableState';

import './GoalCards.css';



export class GoalCards extends React.Component <{goalCards: IGoalCards[]}, {}> {
    public render() {
        const emptyPiles = [];
        for (let i = this.props.goalCards.length; i < 4; i++) {
            emptyPiles.push(<div className="goal-card"><EmptyPile /></div>)
        }
        return (
            <div className="goal-cards">
                {this.props.goalCards.map((goalCard, i: number) => {
                    return (
                        <div className="goal-card" key={i}>
                            {goalCard.cards.length > 0 && <Card card={{card: goalCard.cards[goalCard.cards.length - 1]}} />}
                        </div>
                    )
                })}
                {emptyPiles}
            </div>
        );
    }
}
