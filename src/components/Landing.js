import React, { Component } from "react";
import StatsPanel from './StatsPanel';

// have "login" form that asks for username field, 
// which hides upon entering valid
class Landing extends Component {
    constructor() {
        super();
        this.state = {
            username: "Anonymous",
            entered: false,
            saveFile: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // send a get to /stats to find save file
    handleSubmit(evt) {
        evt.preventDefault();
        if(this.state.value === '') {
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
            });
        }

        
    }

    handleChange(evt) { 
        this.setState({username: evt.target.value});
    }

    render() {
        // modify this later to include multiple stats panels, prestige button
        const ret = this.state.entered ? <StatsPanel saveFile={this.state.saveFile} /> : (
            <form onSubmit={(evt) => this.handleSubmit(evt)}>
                <label>
                    Enter username: <input type="text" value={this.state.username} onChange={(evt) => this.handleChange(evt)} />
                </label>
                <input type="submit" className="submit" value="Submit" />
            </form>);
        return ret;
    }
}

export default Landing;