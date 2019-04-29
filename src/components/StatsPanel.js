import React, { Component } from "react";

// use xhr to ajax for savefile in database, then show rest of game
// game should be built using react components with onClick events
class StatsPanel extends Component {
	constructor(props) {
        console.log(props);
		super(props);
		this.state = {
			happiness: props.saveFile.happiness
        };
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        // const url = '/save';
        // fetch(url, {
        //     method: "GET"
        // })
        // .then(res => res.json())
        // .then(parsed => {
        //     this.setState({happiness: parsed.happiness});
        // });
    }

	handleClick() {
		// use setState to update props on state - do NOT assign directly, as setState will also re-render your component for you.
        this.setState({happiness: this.state.happiness + 1});
        console.log(this.props.saveFile.happiness);
        console.log(this.state.happiness);
        const url = '/stats';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `happiness=${this.state.happiness}`
        })
        .then(response => {
            return response.json();
        })
        .catch(error => console.error('ERROR:', error));
        // .then(parsed => {

        // });
	}

	render() {
		return <div onClick={() => this.handleClick()} className="counter"><h4>{this.state.happiness} (Click Me!)</h4></div>;
	}
}

export default StatsPanel;