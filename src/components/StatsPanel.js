import React, { Component } from "react";
import style from './StatsPanel.css';
import UpgradePanel from "./UpgradePanel";

class StatsPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
            statName: props.statName,
            stat: props.stat,
            costs: [25, 50, 75],
            upgradeTypes: ["clickPlus", "incrStat", "unlockPrestige"],
            upgradeDescs: ["Get more resources per click.",
                            "Hire a tutor to click for you.",
                            "Purchase all three of these prestige unlockers to prestige."],
            upgradesOwned: props.upgrades,
            incrementing: false
        };
        
        this.handleClick = this.handleClick.bind(this);
        this.purchaseUpgrade = this.purchaseUpgrade.bind(this);
        this.startIncrement = this.startIncrement.bind(this);
    }

    purchaseUpgrade(evt, i) {
        if(this.state.stat < this.state.costs[i] || this.state.upgradesOwned[i] === true) { 
            return; 
        }
        
        // save our newly purchased upgrade
        const url = '/upgrades';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `name=${this.props.username}&upgradeName=${this.state.upgradeTypes[i]}&level=${1}&owned=${true}&statName=${this.state.statName}&cost=${this.state.stat - this.state.costs[i]}`
        })
        .then(response => {
            return response.json();
        })
        .catch(error => console.error('ERROR: ', error))
        .then(parsed => {
            console.log(parsed);
            const upgradeCopy = this.state.upgradesOwned.slice();
            upgradeCopy[i] = true;
            this.setState({upgradesOwned: upgradeCopy});
            this.setState({stat: this.state.stat - this.state.costs[i]});
        });
    }

	handleClick() {
        const clickVal = this.state.upgradesOwned[0] ? 2 : 1;
        this.setState({stat: this.state.stat + (clickVal * (this.props.prestigeCount + 1))});
  
        const url = '/stats';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `name=${this.props.username}&statName=${this.state.statName}&stat=${this.state.stat}`
        })
        .then(response => {
            return response.json();
        })
        .catch(error => console.error('ERROR: ', error));
	}

    startIncrement() {
        this.interval = setInterval(() => {
            this.handleClick();
        }, 1000);
    }

	render() {
        if(this.state.upgradesOwned[1] === true && this.state.incrementing === false) {
            this.startIncrement();
            this.setState({incrementing: true});
        }

        const btnStr = this.state.statName.charAt(0).toUpperCase() + this.state.statName.slice(1);
        const upgradePanels = this.state.costs.map((cost, i) => {
            // change the color depending on whether the upgrade can be purchased
            let ownership = 'owned';
            if(this.state.stat < this.state.costs[i] && this.state.upgradesOwned[i] === false) {
                ownership = 'unpurchasable';
            } else if (this.state.stat >= this.state.costs[i] && this.state.upgradesOwned[i] === false) {
                ownership = 'purchasable';
            }

            return (<UpgradePanel ownership={ownership} purchaseUpgrade={(evt) => this.purchaseUpgrade(evt, i)} purchased={false} cost={cost} statName={this.state.statName} upgradeType={this.state.upgradeTypes[i]} upgradeDesc={this.state.upgradeDescs[i]} key={i} />);
        });

        return (
            <div className={style.panel}>
                <h1>{this.state.statName}</h1>
                {upgradePanels}
                <h2>Your {this.state.statName}: {this.state.stat}</h2><br />
                <button onClick={() => this.handleClick()} className={style.purchase}>Get {btnStr}!</button><br />
            </div>
        );
	}
}

export default StatsPanel;