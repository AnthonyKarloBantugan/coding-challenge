// Your code should go here
import { USERS } from "../json/data.js";
let users = USERS;
// Render contents on page laod
document.addEventListener("DOMContentLoaded", () => displayDetails(users));

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
	const tableBody = document.getElementById("table-body");

	data.forEach((user) => {
		if (user.phone.length > 14) {
			user.phone = "Invalid Number";
		}

		const tableRow = document.createElement("tr"); //creates "tr" element
		tableRow.setAttribute("class", "table-row");
		tableBody.appendChild(tableRow); // adds "tableRow" inside "tableBody"

		// Creates HTML code "td" inside "tableRow" to display user details
		tableRow.innerHTML = `
	    <td class="d-inline-block text-truncate table-detail" style="max-width: 150px;">${user.name.title}. ${user.name.last} ${user.name.first}</td>
	    <td class="table-detail">${user.email}</td>
	    <td class="table-detail">${user.phone}</td>
	    <td class="table-detail"><img src="${user.pictureUrl}"></td>
	    <td class="table-detail">${user.accountBalance}</td>
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

	const tb = document.getElementById("table-body");
	const tr = document.querySelectorAll(".table-row");

	// removes the created "tr" on load page
	tr.forEach((row) => {
		tb.removeChild(row);
	});

	displayDetails(sortedData);
}
