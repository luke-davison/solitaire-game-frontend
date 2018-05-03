import { ICardDetails } from '../Card/getCardDetails';
import { IPlayedCard, ITableState } from './ITableState';

export function dealCards(deck: ICardDetails[]): ITableState {
    const numberOfColumns = 7;

    const playedCards: IPlayedCard[][] = [];
    for (let i = 0; i < numberOfColumns; i++) {
        playedCards.push([]);
    }
    for (let row = 0; row < numberOfColumns; row++) {
        for (let column = row; column < numberOfColumns; column++) {
            const faceDown = row !== column;
            const card = deck.pop();
            if (card) {
                playedCards[column].push({row, column, faceDown, card})
            }
        }
    }
    return {
        deck,
        discards: {cards: [], showing: 0},
        goalCards: [],
        heldCards: {cards: [], column: 0, location: ""},
        mouse: {x: 0, y: 0},
        playedCards
    }
    
}