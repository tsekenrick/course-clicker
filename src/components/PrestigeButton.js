import React, { Component } from "react";
import style from './PrestigeButton.css';

class PrestigeButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.canPrestige ? (
            <div>
                <button onClick={this.props.handlePrestige} className={style.prestige}>Prestige {this.props.prestigeCount + 1}</button><br />
                <p>{"Resource gain is multiplied by the number of times you've prestiged. Prestiging will reset your stats and upgrades."}</p>
                <p>{"However, because of an error in the way I structured the application, you must refresh to enable prestiging after meeting the requirements, then refresh again for the prestige to take effect."}</p>
            </div>)
             :
            (<div>
                <button className={style.prestige} disabled>Prestige {this.props.prestigeCount + 1}</button><br />
                <p>{"Resource gain is multiplied by the number of times you've prestiged. Prestiging will reset your stats and upgrades."}</p>
                <p>{"However, because of an error in the way I structured the application, you must refresh to enable prestiging after meeting the requirements, then refresh again for the prestige to take effect."}</p>
            </div>);
        
    }
}

export default PrestigeButton;