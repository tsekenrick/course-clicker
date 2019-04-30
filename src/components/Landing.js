import React, { Component } from "react";
import StatsPanel from './StatsPanel';
import PrestigeButton from "./PrestigeButton";

// have "login" form that asks for username field, 
// which hides upon entering valid
class Landing extends Component {
    constructor() {
        super();
        this.state = {
            username: "Anonymous",
            entered: false,
            saveFile: {},
            prestigeCount: 0,
            upgradesOwned: [[false, false, false], [false, false, false], [false, false, false]]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // send a get to /stats to find save file
    handleSubmit(evt) {
        evt.preventDefault();

        // the most basic of input validation
        if(this.state.value === '' || this.state.value === 'Anonymous') {
            return;
        } else {
            const url = `/stats?user=${this.state.username}`;
            fetch(url, {
                method: "GET"
            })
            .then(response => {
                return response.json();
            })
            .then(parsed => {
                this.setState({saveFile: parsed});
                this.setState({entered: true});
                const upgradesCopy = this.state.upgradesOwned.slice();
                const upgradeData = [parsed.happinessUpgrades, parsed.prodUpgrade, parsed.knowledgeUpgrade];
                for(let i = 0; i < upgradeData.length; i++) {
                    for(const entry of upgradeData[i]) {
                        switch(entry.name) {
                            case "clickPlus":
                                upgradesCopy[i][0] = true;
                                break;
                            case "incrStat":
                                upgradesCopy[i][1] = true;
                                break;
                            case "unlockPrestige":
                                upgradesCopy[i][2] = true;
                                break;                
                        }
                    }
                }
                this.setState({upgradesOwned: upgradesCopy});
                this.setState({prestigeCount: parsed.prestigeCount});
            });
        }

        
    }

    handleChange(evt) { 
        this.setState({username: evt.target.value});
    }

    handlePrestige() {
        this.setState({prestigeCount: this.state.prestigeCount + 1});
  
        const url = '/stats';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `name=${this.state.username}&statName=prestigeCount&stat=${this.state.prestigeCount}`
        })
        .then(response => {
            return response.json();
        })
        .catch(error => console.error('ERROR: ', error));
    }

    render() {
        // TODO: could probably render the 3 stats panels with a map call
        const canPrestige = this.state.upgradesOwned[0][2] && this.state.upgradesOwned[1][2] && this.state.upgradesOwned[2][2];
        const ret = this.state.entered ? 
            (<div>
                <StatsPanel username={this.state.username} statName="Happiness" stat={this.state.saveFile.happiness} upgrades={this.state.upgradesOwned[0]} prestigeCount={this.state.saveFile.prestigeCount} />
                <StatsPanel username={this.state.username} statName="Productivity" stat={this.state.saveFile.productivity} upgrades={this.state.upgradesOwned[1]} prestigeCount={this.state.saveFile.prestigeCount} />
                <StatsPanel username={this.state.username} statName="Knowledge" stat={this.state.saveFile.knowledge} upgrades={this.state.upgradesOwned[2]} prestigeCount={this.state.saveFile.prestigeCount} /><br />
                <PrestigeButton handlePrestige={this.handlePrestige} canPrestige={canPrestige} /><br />
                <p>(You have prestiged {this.state.prestigeCount} times.)</p>
            </div>)
            : 
            (<form onSubmit={(evt) => this.handleSubmit(evt)}>
                <label>
                    Enter username: <input type="text" value={this.state.username} onChange={(evt) => this.handleChange(evt)} />
                </label>
                <input type="submit" className="submit" value="Submit" />
            </form>);
        return ret;
    }
}

export default Landing;