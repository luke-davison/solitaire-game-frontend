export const imagePath = '/Cards/';

export interface ICardDetails {
    cardId: number;
    suit: string;
    color: string;
    value: number;
    number: string;
    longNumber: string;
    url: string;
}

export function getCardDetails(cardId: number): ICardDetails {
    const suit = getSuit(cardId);
    const color = getColour(suit);
    const value = getValue(cardId);
    const cardNumber = getNumber(value);
    const longNumber = getLongNumber(cardNumber);
    const url = getUrl(suit, cardNumber);
    return {cardId, suit, color, value, number: cardNumber, longNumber, url};
}

function getSuit(cardId: number): string {
    if (cardId < 13) {
        return 'Clubs';
    }
    if (cardId < 26) {
        return 'Spades';
    }
    if (cardId < 39) {
        return 'Diamonds';
    }
    if (cardId < 52) {
        return 'Hearts';
    }
    return 'unknown suit';
}

function getColour(cardSuit: string): string {
    if (cardSuit === 'Clubs' || cardSuit === 'Spades') {
        return 'Black'
    }
    if (cardSuit === 'Diamonds' || cardSuit === 'Hearts') {
        return 'Red'
    }
    return 'unknown colour';
}

function getValue(cardId: number): number {
    return cardId % 13 + 1;
}

function getNumber(cardValue: number): string {
    if (cardValue === 1) {
        return 'A';
    }
    if (cardValue === 11) {
        return 'J'
    }
    if (cardValue === 12) {
        return 'Q'
    }
    if (cardValue === 13) {
        return 'K'
    }
    if (cardValue > 1 && cardValue < 11) {
        return String(cardValue);
    }
    return 'unknown number'
}

function getLongNumber(cardNumber: string): string {
    switch (cardNumber) {
        case 'A': return 'Ace';
        case '2': return 'Two';
        case '3': return 'Three';
        case '4': return 'Four';
        case '5': return 'Five';
        case '6': return 'Six';
        case '7': return 'Seven';
        case '8': return 'Eight';
        case '9': return 'Nine';
        case '10': return 'Ten';
        case 'J': return 'Jack';
        case 'Q': return 'Queen';
        case 'K': return 'King';
        default: return 'Unknown Long Number';
    }
}

function getUrl(cardSuit: string, cardsNumber: string): string {
    return `${imagePath}card${cardSuit}${cardsNumber}.png`
}