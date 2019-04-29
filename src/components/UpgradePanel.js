import React, { Component } from "react";
import style from './UpgradePanel.css';

class UpgradePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchased: props.purchased
        };
    }

    render() {
        return (
            <div className={style.upgrade}>
                <p>{"Here's a description of the upgrade."}</p>
            </div>
        );
        
    }
}

export default UpgradePanel;