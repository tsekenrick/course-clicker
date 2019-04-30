import React, { Component } from "react";
import style from './UpgradePanel.css';

class UpgradePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cost: props.cost
        };
    }

    render() {
        let classes = "";
        switch(this.props.ownership) {
            case "owned":
                classes = `${style.upgrade} ${style.owned}`;
                break;

            case "unpurchasable":
                classes = `${style.upgrade} ${style.unpurchasable}`;
                break;
            
            case "purchasable":
                classes = `${style.upgrade} ${style.purchasable}`;
                break;
        }
        return (
            <div onClick={this.props.purchaseUpgrade} className={classes}>
                <h2>Cost: {this.state.cost} {this.props.statName}</h2>
                <p>{this.props.upgradeDesc}</p>
            </div>
        );
        
    }
}

export default UpgradePanel;