import * as React from 'react';

import { ICardDetails } from '../Card/getCardDetails';
import { Deck } from '../Deck/Deck';
import { GoalCards } from '../GoalCards/GoalCards';
import { HeldCards } from '../HeldCards/HeldCards';
import { PlayedCards } from '../PlayedCards/PlayedCards';
import { getDeck, getWinningMessage } from './api';
import { dealCards } from './dealCards';
import { HiddenImages } from './HiddenImages';
import { IDiscards, IGoalCards, IHeldCards, IPlayedCard, ITableState } from './ITableState';

import "./Table.css"

interface ITableProps {
    match: {params: {game: number}}
}

export class Table extends React.Component <ITableProps, ITableState> {
    constructor(props: ITableProps) {
        super(props);
        this.state = {
            deck: [],
            discards: {cards: [], showing: 0},
            goalCards: [],
            heldCards: {cards: [], column: 0, location: ""},
            mouse: {x: 0, y: 0},
            playedCards: []
        }
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.drawFromDeck = this.drawFromDeck.bind(this);
        this.addHeldCardsToColumn = this.addHeldCardsToColumn.bind(this);
        this.returnHeldCards = this.returnHeldCards.bind(this);
        this.drawFromDiscards = this.drawFromDiscards.bind(this);
        this.pickupPlayedCards = this.pickupPlayedCards.bind(this);
        this.playHeldCards = this.playHeldCards.bind(this);
        this.addGoalCard = this.addGoalCard.bind(this);
        this.checkForWin = this.checkForWin.bind(this);
        getDeck(this.props.match.params.game).then((deck: ICardDetails[]) => {
            this.setState(dealCards(deck))
        })
    }

    public render() {
        return (
        <div className="table" onMouseMove={this.onMouseMove} onClick={this.onMouseClick}>
            <div className="top-cards">
                <Deck deck={this.state.deck} discards={this.state.discards} />
                <GoalCards goalCards={this.state.goalCards} />
            </div>
            <PlayedCards playedCards={this.state.playedCards} />
            <HeldCards heldCards={this.state.heldCards.cards} mouse={this.state.mouse}/>
            <HiddenImages />
        </div>
        );
    }

    private updateState(newState: {
        deck?: ICardDetails[],
        discards?: IDiscards,
        playedCards?: IPlayedCard[][],
        goalCards?: IGoalCards[],
        heldCards?: IHeldCards,
        mouse?: {x: number, y: number}
    }) {
        const deck: ICardDetails[] = newState.deck ? newState.deck : this.state.deck;
        const discards: IDiscards = newState.discards ? newState.discards : this.state.discards;
        const playedCards: IPlayedCard[][] = newState.playedCards ? newState.playedCards : this.state.playedCards;
        const goalCards: IGoalCards[] = newState.goalCards ? newState.goalCards : this.state.goalCards;
        const heldCards: IHeldCards = newState.heldCards ? newState.heldCards : this.state.heldCards;
        const mouse: {x: number, y: number} = newState.mouse ? newState.mouse : this.state.mouse;
        this.setState({deck, discards, playedCards, goalCards, heldCards, mouse})
    }

    private onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        this.updateState({mouse: {x: e.clientX, y: e.clientY}})
    }

    private onMouseClick() {
        let columnNumber = Math.floor(this.state.mouse.x / 150);
        if (columnNumber > 6) {
            columnNumber = 6;
        }
        if (columnNumber < 0) {
            columnNumber = 0;
        }
        const rowNumber = Math.floor((this.state.mouse.y - 220) / 30);

        if (!this.state.heldCards.cards.length) {
            if (rowNumber >= -1) {
                return this.pickupPlayedCards(columnNumber, rowNumber);
            }
            if (columnNumber === 0) {
                return this.drawFromDeck();
            }
            if (columnNumber < 3) {
                return this.drawFromDiscards();
            }
        } else {
            if (rowNumber >= -1) {
                return this.playHeldCards(columnNumber);
            }
            if (rowNumber < 2) {
                return this.addGoalCard();
            }
        }
        return this.returnHeldCards();
    }

    private drawFromDeck() {
        if (this.state.deck.length) {
            this.state.discards.showing = 0;
            for (let i = 0; i < 3; i++) {
                if (this.state.deck.length) {
                    this.state.discards.showing++;
                    const drawnCard = this.state.deck.pop()
                    if (drawnCard) {
                        this.state.discards.cards.push(drawnCard)
                    }
                }
            }
            this.updateState({deck: this.state.deck, discards: this.state.discards})
        } else {
            this.state.discards.cards.reverse()
            this.updateState({deck: this.state.discards.cards, discards: {cards: [], showing: 0}})
        }
    }

    private addHeldCardsToColumn(columnNo: number) {
        const column = this.state.playedCards[columnNo];
        this.state.heldCards.cards.forEach((heldCard, i) => {
            column.push({
                card: heldCard,
                column: columnNo,
                faceDown: false,
                row: column.length
            })
        })
        this.updateState({heldCards: {cards: [], location: "", column: 0}})
    }

    private returnHeldCards() {
        if (this.state.heldCards.location === "played") {
            this.addHeldCardsToColumn(this.state.heldCards.column);
        } else {
            this.state.heldCards.cards.forEach((heldCard, i) => {
                this.state.discards.cards.push(heldCard);
                this.state.discards.showing++;
            })
            this.updateState({heldCards: {cards: [], location: "", column: 0}})
        }
    }

    private drawFromDiscards() {
        if (this.state.discards.cards.length) {
            const drawnCard = this.state.discards.cards.pop();
            if (drawnCard) {
                this.state.heldCards.location = "deck";
                this.state.heldCards.cards.push(drawnCard);
                if (this.state.discards.showing > 1 || !this.state.discards.cards.length) {
                    this.state.discards.showing--;
                }
                this.updateState({});
            }
        }
    }

    private pickupPlayedCards(columnNo: number, rowNo: number) {
        const column = this.state.playedCards[columnNo];
        if (column.length) {
            if (rowNo > column.length - 1) {
                rowNo = column.length - 1
            }
            if (column[column.length - 1].faceDown) {
                column[column.length - 1].faceDown = false;
                this.updateState({});
            } else {
                if (!column[rowNo].faceDown) {
                    this.state.heldCards.cards = column.splice(rowNo).map(playedCard => playedCard.card);
                    this.state.heldCards.column = columnNo;
                    this.state.heldCards.location = "played";
                    this.updateState({});
                }
            }
        }
    }

    private playHeldCards(columnNo: number) {
        const column = this.state.playedCards[columnNo];
        const heldCard = this.state.heldCards.cards[0]
        if (!column.length) {
            if (heldCard.value === 13) {
                return this.addHeldCardsToColumn(columnNo);
            }
        } else {
            const columnCard = column[column.length - 1];
            if (!columnCard.faceDown && columnCard.card.color !== heldCard.color && columnCard.card.value === heldCard.value + 1) {
                return this.addHeldCardsToColumn(columnNo);
            }
        }
        return this.returnHeldCards();
    }

    private addGoalCard() {
        if (this.state.heldCards.cards.length === 1) {
            const heldCard = this.state.heldCards.cards[0];
            const suitGoal = this.findGoalCards(heldCard.suit)
            // const suitGoal = this.state.goalCards.find(goalCard => goalCard.suit === heldCard.suit)
            if (suitGoal) {
                if (!suitGoal.cards.length) {
                    if (heldCard.value === 1) {
                        suitGoal.cards.push(heldCard);
                        this.state.heldCards.cards = [];
                        this.updateState({});
                        return this.checkForWin();
                    }
                } else {
                    if (heldCard.value === suitGoal.cards[suitGoal.cards.length - 1].value + 1) {
                        suitGoal.cards.push(heldCard);
                        this.state.heldCards.cards = [];
                        this.updateState({});
                        return this.checkForWin();
                    }
                }
            } else {
                if (heldCard.value === 1) {
                    this.state.goalCards.push({suit: heldCard.suit, cards: [heldCard]})
                    this.state.heldCards.cards = [];
                    this.updateState({});
                    return this.checkForWin();
                }
            }
        }
        return this.returnHeldCards();
    }

    private checkForWin() {
        let hasWon: boolean = true;
        this.state.goalCards.forEach(goalCard => {
            if (goalCard.cards.length !== 13) {
                hasWon = false;
            }
        })
        if (hasWon) {
            getWinningMessage(this.props.match.params.game).then(message => {
                alert(message);
            })
        }
    }

    private findGoalCards(suit: string): IGoalCards | undefined {
        let suitGoal: IGoalCards | undefined
        this.state.goalCards.forEach(goalCard => {
            if (goalCard.suit === suit) {
                suitGoal = goalCard;
            }
        })
        return suitGoal
    }
}


export interface ITableState {
    deck: ICardDetails[];
    discards: ICardDetails[];
    playedCards: IPlayedCard[][];
    goalCards: ICardDetails[][];
    heldCards: IHeldCards;
}