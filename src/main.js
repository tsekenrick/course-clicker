// function incrHappiness(evt) {
//     let happiness = document.querySelector("#happyVal").textContent;
//     if(!happiness){ happiness = 0; }
//     console.log(`happiness is ${happiness}`);
//     happiness = parseInt(happiness, 10) + 1;

// 	const xhr = new XMLHttpRequest();
// 	const url = '/game';
// 	xhr.open('POST', url);

// 	// setting content-type so it can be parsed by urlencoded body parsing middleware
// 	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

// 	xhr.addEventListener('load', function() {
// 		console.log(xhr.responseText);
// 	});
// 	// set body of post req using send() - when using xhr for get requests, this isn't needed
// 	xhr.send(`happiness=${happiness}`);

//     evt.preventDefault();
// }

// function updateStats() {
// 	const xhr = new XMLHttpRequest();
// 	const url = '/stats';
// 	xhr.open('GET', url);

// 	xhr.addEventListener('load', function (evt) {
// 		// if xhr.statusCode >= 200 < 400
// 		console.log(xhr.responseText);
// 		const save = JSON.parse(xhr.responseText);
// 		const happyHeader = document.querySelector('#happyVal');
//         happyHeader.textContent = save.happiness;
//     });
    
//     setInterval(updateStats, 250);

// 	// add event listener for error here

// 	xhr.send(); // sends http GET request as per the params for xhr.open
// }

// function main() {
//     console.log('running');
//     updateStats();
//     const btn = document.querySelector('#happinessBtn');
//     btn.addEventListener('click', incrHappiness);
// }

// document.addEventListener("DOMContentLoaded", main);
