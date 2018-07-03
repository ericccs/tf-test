import React from 'react';
import numeral from 'numeral';

import mockData from '../api/data';
import { getCryptoData } from '../api/api';
import CcySelector from './CcySelector';

const css = require('./CryptoCcyList.css');


const CCY_LIST = [
    { name: "SGD" },
    { name: "AUD" },
    { name: "EUR" },
    { name: "GBP" },
    { name: "USD" },
    { name: "VND" }
];

export default class CryptoCcyList extends React.Component {
    constructor() {
        super();
        this.state = {
            cryptoList: [],
            activeCcy: 'SGD'
        };
        this.selectCcy = this.selectCcy.bind(this);
    }

    render() {
        const element = this.state.cryptoList.map(data => {
            const price = numeral(data["price_" + this.state.activeCcy.toLowerCase()]).format('0,0.00');
            return (
                <div key={data.id} className={css.cryptoRow}>
                    <div className={css.cryptoName}>{data.name}</div>
                    <div className={css.cryptoPrice}>{`${this.state.activeCcy} ${price}`}</div>
                    <div className={css.cryptoChange}>{`${data.percent_change_24h}%`}</div>
                </div>
            );
        });


        return (
            <div align="center">
                <CcySelector ccyList={CCY_LIST} activeCcy={this.state.activeCcy} handleCcyChange={this.selectCcy}/>
                {element}
            </div>

        );
    }

    componentDidMount() {
        this.updateCryptoData(this.state.activeCcy);
    }

    selectCcy(e) {
        console.log("Selected ccy: ", e.target.value);
        if (this.state.activeCcy !== e.target.value) {
            this.updateCryptoData(e.target.value);
        }

    }

    updateCryptoData(displayCcy) {
        getCryptoData(displayCcy).then(res => {
            console.log("ccy: " + displayCcy + ", res: " + res);
            this.setState({ cryptoList: res, activeCcy: displayCcy });
        }).catch(err => {
            console.log("Error: ", err);
        });
    }
}
