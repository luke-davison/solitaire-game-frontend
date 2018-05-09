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
        {position: 21, value: 1},
        {position: 18, value: 7},
        {position: 15, value: 5},
        {position: 12, value: 1},
        {position: 9, value: 5},
        {position: 6, value: 9},
        {position: 3, value: 5},
        {position: 0, value: 3},
        {position: 24, value: 3},
        {position: 26, value: 7},
        {position: 29, value: 4},
        {position: 33, value: 6},
        {position: 38, value: 6},
        {position: 44, value: 7},
        {position: 51, value: 1}
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
