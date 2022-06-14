// Your code should go here
import { USERS } from "../json/data.js";

// Render contents on page laod
document.addEventListener("DOMContentLoaded", displayDetails());

// [Variables]
const startRandomBtn = document.getElementById("start");
const stopRandomBtn = document.getElementById("stop");
const sortBtn = document.getElementById("sort");

// Start Random Event Listener
startRandomBtn.addEventListener("click", () => {
	// random shuffle interval set to 1 sec
	const shuffleInterval = setInterval(shuffle, 1000);

	// disables sort button
	sortBtn.disabled = true;

	// stops random shuffle
	stopRandomBtn.addEventListener("click", () => {
		clearInterval(shuffleInterval);
		sortBtn.disabled = false;
	});
});

// Sort Event Listener
sortBtn.addEventListener("click", () => sort());

// [FUNCTIONS]
function displayDetails(data) {
	if (data !== null && data !== undefined) {
		const tableBody = document.getElementById("table-body");
		tableBody.innerHTML = ""; //removes on load created HTML codes from ".table-body"

		// Creates a "tr" and corresponding "td" for each element in the data array
		data.forEach((user) => {
			const tableRow = document.createElement("tr"); //creates "tr" element

			tableBody.appendChild(tableRow); // adds "tableRow" inside "tableBody"

			// Creates HTML code "td" inside "tableRow" to display user details
			tableRow.innerHTML = `
        <td class="d-inline-block text-truncate" style="max-width: 150px;">${user.name.title}. ${user.name.last} ${user.name.first}</td>
        <td>${user.email}</td>       
        <td>1234</td>
        <td><img src="${user.pictureUrl}"></td>
        <td>${user.accountBalance}</td>       
        `;
		});
	}

	const tableBody = document.getElementById("table-body");

	USERS.forEach((user) => {
		if (user.phone.length > 14) {
			user.phone = "Invalid Number";
		}

		const tableRow = document.createElement("tr"); //creates "tr" element

		tableBody.appendChild(tableRow); // adds "tableRow" inside "tableBody"

		// Creates HTML code "td" inside "tableRow" to display user details
		tableRow.innerHTML = `
	    <td class="d-inline-block text-truncate" style="max-width: 150px;">${user.name.title}. ${user.name.last} ${user.name.first}</td>
	    <td>${user.email}</td>
	    <td>${user.phone}</td>
	    <td><img src="${user.pictureUrl}"></td>
	    <td>${user.accountBalance}</td>
	    `;
	});
}

function shuffle() {
	const shuffledData = USERS.sort(() => Math.random() - 0.5);
	displayDetails(shuffledData);
}

function sort() {
	const sortedData = USERS.sort((a, b) => {
		return b.accountBalance - a.accountBalance;
	});

	displayDetails(sortedData);
}
