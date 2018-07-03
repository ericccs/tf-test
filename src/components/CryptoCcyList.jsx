import React from 'react';
import numeral from 'numeral';

import mockData from '../api/data';
import { getCryptoData } from '../api/api';

const css = require('./CryptoCcyList.css');

export default class CryptoCcyList extends React.Component {
    constructor() {
        super();
        this.state = {
            cryptoList: []
        };
    }

    render() {
        // const data = this.state.cryptoList;
        const element = this.state.cryptoList.map(data => {
            console.log("ccy: ", JSON.stringify(data))
            return (
                <div key={data.id} className={css.cryptoRow}>
                    <div className={css.cryptoName}>{data.name}</div>
                    <div className={css.cryptoPrice}>{`SGD ${numeral(data.price_sgd).format('0,0.00')}`}</div>
                    <div className={css.cryptoChange}>{`${data.percent_change_24h}%`}</div>
                </div>
            );
        });

        return element;
    }

    componentDidMount() {
        getCryptoData().then(res => {
            console.log("response: ", res);
            this.setState({ cryptoList: res });
        });
    }
}
