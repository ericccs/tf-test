import React from 'react';
import numeral from 'numeral';

import mockData from '../api/data';
import { getCryptoData } from '../api/api';
import CcySelector from './CcySelector';

const css = require('./CryptoCcyList.css');



export default class CryptoCcyList extends React.Component {
    constructor() {
        super();
        this.state = {
            cryptoList: [],
            activeCcy: 'SGD',
            ccyList: [
                { name: "SGD" },
                { name: "AUD" },
                { name: "EUR" },
                { name: "GBP" },
                { name: "USD" },
                { name: "VND" }
            ]
        };
        this.selectCcy = this.selectCcy.bind(this);
    }

    render() {
        const element = this.state.cryptoList.map((data, idx) => {
            const price = numeral(data["price_" + this.state.activeCcy.toLowerCase()]).format('0,0.00');
            const priceStyle = css.cryptoChange + ' ' + css.cryptoLabel + ' '
                + (data.percent_change_24h >= 0 ? css.cryptoLabelUp : css.cryptoLabelDown);
            return (
                <div key={data.id} className={css.cryptoRow}>
                    <div className={css.cryptoName}>{data.name}</div>
                    <div className={css.cryptoPrice}>{`${this.state.activeCcy} ${price}`}</div>
                    <div className={priceStyle}>{`${data.percent_change_24h}%`}</div>
                </div>
            );
        });


        return (
            <div align="center">
                <CcySelector ccyList={this.state.ccyList} activeCcy={this.state.activeCcy} handleCcyChange={this.selectCcy}/>
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
            console.log("ccy: " + displayCcy + ", res: ", res);
            this.setState({ cryptoList: res, activeCcy: displayCcy });
        }).catch(err => {
            console.log("Error: ", err);
        });
    }
}
