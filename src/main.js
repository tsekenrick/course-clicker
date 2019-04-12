function incrHappiness(evt) {
	const message = document.querySelector("#message").value;
	const name = document.querySelector("#name").value;

	// when making a POST request with xhr, must specify content-type
	// this is because can post diff types of data (json, urlencoded, xml)
	// we will use urlencoded to take advantage of req.body, which is what we're familiar with
	const xhr = new XMLHttpRequest();
	const url = '/game';
	xhr.open('POST', url);

	// setting content-type so it can be parsed by urlencoded body parsing middleware
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

	xhr.addEventListener('load', function() {
		console.log(xhr.responseText);
	});

	// set body of post req using send() - when using xhr for get requests, this isn't needed
	xhr.send(`message=${message}&name=${name}`);

	evt.preventDefault(); // so that the form doesn't try to submit its own post request
}

// send get to '/' to find stats using mongoose
function updateStats() {
	const xhr = new XMLHttpRequest();
	const url = '/game';
	xhr.open('GET', url);

	xhr.addEventListener('load', function (evt) {
		// if xhr.statusCode >= 200 < 400
		console.log(xhr.responseText);
		const messages = JSON.parse(xhr.responseText);
		const messagesDiv = document.querySelector('#messages');

		for(const m of messages) {
			const p = document.createElement('p');
			p.textContent = `${m.message} - ${m.name}`;
			messagesDiv.appendChild(p);
		}
	});

	// add event listener for error here

	xhr.send(); // sends http GET request as per the params for xhr.open
}

function main() {
    updateStats();
    const btn = document.querySelector('#happinessBtn');
    btn.addEventListener('click', incrHappiness);
}

document.addEventListener("DOMContentLoaded", main); // async, location doesn't matter
