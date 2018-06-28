import React from 'react';
import numeral from 'numeral';

import mockData from '../api/data';
import {getCryptoData} from '../api/api';

const css = require('./CryptoCcyList.css');

export default class CryptoCcyList extends React.Component {
    constructor() {
        this.state = {};
    }

    render() {
        const data = mockData;
        return (
            <div className={css.cryptoRow}>
                <div className={css.cryptoName}>{data.name}</div>
                <div className={css.cryptoPrice}>{`SGD ${numeral(data.price_sgd).format('0,0.00')}`}</div>
                <div className={css.cryptoChange}>{`${data.percent_change_24h}%`}</div>
            </div>
        );
    }
}
