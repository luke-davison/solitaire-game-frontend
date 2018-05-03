import * as React from 'react';

import { Card } from '../Card/Card';
import { IGoalCards } from '../Table/ITableState';

import './GoalCards.css';


export class GoalCards extends React.Component <{goalCards: IGoalCards[]}, {}> {
    public render() {
    return (
        <div className="goal-cards">
            {this.props.goalCards.map((goalCard, i: number) => {
                return (
                    <div className="goal-card" key={i}>
                        {goalCard.cards.length > 0 && <Card card={{card: goalCard.cards[goalCard.cards.length - 1]}} />}
                    </div>
                )
            })}
        </div>
    );
  }
}
