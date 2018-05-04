import * as React from 'react';

import { getCardDetails } from '../Card/getCardDetails';

import "./Table.css"

export class HiddenImages extends React.Component <{}, {}> {

    public render() {
        const arr: string[] = []
        for (let i = 0; i < 51; i++) {
            arr.push(getCardDetails(i).url)
        }
        return (
        <div className="hidden-images" style={{display: "none"}}>
            {arr.map((url, i) => <img src={url} key={i} />)}
        </div>
        );
    }
}