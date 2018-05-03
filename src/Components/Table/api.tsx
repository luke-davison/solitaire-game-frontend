import { getCardDetails, ICardDetails } from '../Card/getCardDetails';

export function getDeck(): Promise<ICardDetails[]> {
    const deck = getDummyDeck();
    const promise = new Promise((resolve, reject) => {
        resolve();
    })
    return promise.then((result) => {
        return deck
    })
}

function getDummyDeck(): ICardDetails[] {
    const predefinedPositions: Array<{position: number, value: number, card?: ICardDetails}> = [
        {position: 5, value: 8},
        {position: 8, value: 5},
        {position: 11, value: 7},
        {position: 14, value: 1},
        {position: 17, value: 5},
        {position: 20, value: 7},
        {position: 23, value: 1},
        {position: 4, value: 2},
        {position: 7, value: 1},
        {position: 10, value: 6},
        {position: 13, value: 4},
        {position: 16, value: 7},
        {position: 19, value: 3},
        {position: 22, value: 10},
    ];
    const allCards: ICardDetails[] = [];
    for (let i = 0; i < 52; i++) {
        allCards.push(getCardDetails(i))
    }
    predefinedPositions.forEach((position:  {position: number, value: number, card?: ICardDetails}) => {
        const possibleCards = allCards.reduce((arr: Array<{oldPosition: number, card: ICardDetails}>, card, i) => {
            if (card.value === position.value) {
                arr.push({oldPosition: i, card});
            }
            return arr;
        }, []);
        const chosenCard = allCards.splice(possibleCards[Math.floor(Math.random()*possibleCards.length)].oldPosition, 1);
        if (chosenCard[0]) {
            position.card = chosenCard[0];
        }
        
    })
    const dummyDeck: ICardDetails[] = []
    for (let i = 0; i < 52; i++) {
        const alreadyDefined = predefinedPositions.find(position => position.position === i);
        if (alreadyDefined && alreadyDefined.card) {
            dummyDeck.push(alreadyDefined.card);
        } else {
            dummyDeck.push(allCards.splice(Math.floor(Math.random()*allCards.length), 1)[0])
        }
    }
    return dummyDeck;
}

export function getWinningMessage(): Promise<string> {
    const promise = new Promise((resolve, reject) => {
        resolve();
    })
    return promise.then((result) => {
        return "You have won!  The coordinates are as follows: (to be determined)"
    })
}
