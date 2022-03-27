import React from 'react';
import { getCardImageURL } from '../utils';

export const CardSearchPreview = (props = {}) => {
    const { cardData } = props;
    const CardImage = ({ multiverseId }) => {
        if (!multiverseId) {
            return (<div />)
        }
        const cardImageURL = getCardImageURL(multiverseId);
        return (
            <div><img title={cardImageURL} alt={cardImageURL} src={cardImageURL} style={{maxWidth: "100px"}} /></div>
        )
    }

    const multiverseId = cardData.identifiers.multiverseId;

    return (
        <div>
            {/* <div>{cardData.name}</div> */}
            <CardImage multiverseId={multiverseId} />
        </div>

    )
}