import React, { Component } from "react";
import style from './PrestigeButton.css';

class PrestigeButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.canPrestige ? (
            <div>
                <button onClick={this.props.handlePrestige} className={style.prestige}>Prestige</button><br />
                <p>{"Resource gain is multiplied by the number of times you've prestiged."}</p>
            </div>)
             :
            (<div>
                <button className={style.prestige} disabled>Prestige</button><br />
                <p>{"Resource gain is multiplied by the number of times you've prestiged."}</p>
            </div>);
        
    }
}

export default PrestigeButton;