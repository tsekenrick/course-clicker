import React, { Component } from "react";
import style from './StatsPanel.css';
import UpgradePanel from "./UpgradePanel";

// use xhr to ajax for savefile in database, then show rest of game
// game should be built using react components with onClick events
class StatsPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
            statName: props.statName,
			stat: props.stat
        };
        
        this.handleClick = this.handleClick.bind(this);
    }

	handleClick() {
        this.setState({stat: this.state.stat + 1});
  
        const url = '/stats';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `statName=${this.state.statName}&stat=${this.state.stat}`
        })
        .then(response => {
            return response.json();
        })
        .catch(error => console.error('ERROR:', error));
	}

	render() {
        const btnStr = this.state.statName.charAt(0).toUpperCase() + this.state.statName.slice(1);
        return (
            <div className={style.panel}>
                <h1>{this.state.statName}</h1>
                <UpgradePanel purchased={false} />
                <UpgradePanel purchased={false} />
                <UpgradePanel purchased={false} />
                <h2>Your {this.state.statName}: {this.state.stat}</h2><br />
                <button onClick={() => this.handleClick()} className={style.purchase}>Get {btnStr}!</button><br />
            </div>
        );
	}
}

export default StatsPanel;