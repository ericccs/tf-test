import {SET_CCY} from "../actions/CryptoCcy";


const initialState = {
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

function setCcyReducer (state = initialState, action) {
    switch(action.type) {
        case SET_CCY:
            return Object.assign({}, state, {
                activeCcy: action.ccy
            })
        default:
            return state;
    }
    return state;
}