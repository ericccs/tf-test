import React from 'react';

export default class CcySelector extends React.Component {

    render() {
        const options = this.props.ccyList.map(ccy => (
            <option key={ccy.name} value={ccy.name} defaultValue={this.props.activeCcy}>{ccy.name}</option>
        ));
        return (
            <div>
                <select id='displayCcy' onChange={this.props.handleCcyChange}>
                    {options}
                </select>
            </div>
        );
    }

}