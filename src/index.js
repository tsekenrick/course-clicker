import React, { Component } from "react";
import ReactDOM from "react-dom";

// have "login" form that asks for username field, 
// which hides upon entering valid
class FakeLogin extends Component {
    constructor() {
        super();
        this.state = {
            username: "Anonymous",
            entered: false
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
            this.setState({
                entered: true
            });
        }

        const url = `/stats?user=${this.state.username}`;
        fetch(url, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        });
        // .then(parsed => {

        // });
    }

    handleChange(evt) { 
        this.setState({username: evt.target.value});
    }

    render() {
        const ret = this.state.entered ? <Counter /> : (
            <form onSubmit={(evt) => this.handleSubmit(evt)}>
                <label>
                    Enter username: <input type="text" value={this.state.username} onChange={(evt) => this.handleChange(evt)} />
                </label>
                <input type="submit" className="submit" value="Submit" />
            </form>);
        return ret;
    }
}

// use xhr to ajax for savefile in database, then show rest of game
// game should be built using react components with onClick events
class Counter extends Component {
	constructor() {
		super();
		this.state = {
			happiness: 0
        };
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        const url = '/save';
        fetch(url, {
            method: "GET"
        })
        .then(res => res.json())
        .then(parsed => {
            this.setState({happiness: parsed.happiness});
        });
    }

	handleClick() {
		// use setState to update props on state - do NOT assign directly, as setState will also re-render your component for you.
        this.setState({happiness: this.state.happiness + 1});
        
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
		return <div onClick={() => this.handleClick()} className="counter"><h4>{this.state.happiness}</h4></div>;
	}
}

ReactDOM.render(<div><FakeLogin /></div>, document.getElementById("index"));