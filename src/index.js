// client-side js here
import React from "react";
import ReactDOM from "react-dom";

// const Index = () => {
//   return <div>Hello React!</div>;
// };

// have "login" form that asks for username field, which hides upon 
// entering valid
class FakeLogin extends React.component {
    constructor() {
        super();
        this.state = {
            username: "Anonymous",
            value: '',
            entered: false
        };
    }
    
    // send a get to /stats to find save file
    handleClick(evt) {
        evt.preventDefault();
        if(this.state.value === '') {
            return;
        } else {
            this.setState({
                username: this.state.value,
                entered: true
            });
        }

        const url = `/stats?user=${this.state.username}`;
        fetch(url, {
            method: "GET"
        })
        .then(response => response.json())
        .then(parsed => {

        });
    }

    handleChange(evt) {
        this.setState({value: evt.target.value});
    }

    render() {
        const ret = this.state.entered ? null : (
            <div className="fakeLogin">
                <h3>Hi, {this.state.username}.</h3>
                Enter username: <input type="text" value={this.state.value} onChange={this.handleChange} />
                <input onClick={(evt) => this.handleClick(evt)} type="button" className="submit" value="Submit" />
            </div>);
        return ret;
    }
}
// use xhr to ajax for savefile in database, then show rest of game
// game should be built using react components with onClick events
class Counter extends React.component {
	constructor() {
		super();
		this.state = {
			happiness: 0
		};
	}

	handleClick() {
		// use setState to update props on state - do NOT assign directly, as setState will also re-render your component for you.
        this.setState({clicks: this.state.happiness + 1});
        
        const url = '/stats';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: this.state.happiness
        })
        .then(response => response.json())
        .then(parsed => {

        });
	}

	render() {
		return <div onClick={() => this.handleClick()} className="counter">{this.state.happiness}</div>;
	}
}

ReactDOM.render(<div><FakeLogin /><Counter /></div>, document.getElementById("index"));