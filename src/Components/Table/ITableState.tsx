import { ICardDetails } from '../Card/getCardDetails';

export interface IPlayedCard {
    column?: number;
    row?: number;
    faceDown?: boolean;
    card: ICardDetails;
}

export interface IHeldCards {
    cards: ICardDetails[];
    location: string;
    column: number;
}

export interface IDiscards {
    cards: ICardDetails[];
    showing: number;
}

export interface IGoalCards {
    suit: string;
    cards: ICardDetails[];
}

export interface ITableState {
    deck: ICardDetails[];
    discards: IDiscards;
    playedCards: IPlayedCard[][];
    goalCards: IGoalCards[];
    heldCards: IHeldCards;
    mouse: {x: number, y: number};
}