import { getCardDetails, ICardDetails } from '../Card/getCardDetails';

import * as request from 'superagent'

export function getDeck(): Promise<ICardDetails[]> {
    return request
        .get('/game2')
        .then((res) => {
            const cardIds: number[] = res.body.cardIds;
            return cardIds.map(id => getCardDetails(id))
        })
}

export function getWinningMessage(): Promise<string> {
    const promise = new Promise((resolve, reject) => {
        resolve();
    })
    return promise.then((result) => {
        return "You have won!  The coordinates are as follows: (to be determined)"
    })
}
