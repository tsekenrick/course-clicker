import React, { Component } from "react";
import style from './PrestigeButton.css';

class PrestigeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canPrestige: props.canPrestige
        };
    }

    render() {
        return this.state.canPrestige ? 
            (<button className={style.prestige}>Prestige</button>) :
            (<button className={style.prestige} disabled>Prestige</button>);
        
    }
}

export default PrestigeButton;