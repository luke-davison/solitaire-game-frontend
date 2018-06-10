import { getCardDetails, ICardDetails } from '../Card/getCardDetails';

import * as request from 'superagent'

export function getDeck(game: number): Promise<ICardDetails[]> {
    return request
        .get('/getdeck?game=' + game)
        .then((res) => {
            const cardIds: number[] = res.body.cardIds;
            return cardIds.map(id => getCardDetails(id))
        })
}

export function getWinningMessage(game: number): Promise<string> {
    return request
        .post('/submit')
        .send({game})
        .then(res => res.body.message)
}
