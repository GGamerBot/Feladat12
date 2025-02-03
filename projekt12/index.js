const API_URL = "https://randomuser.me/api/?results=50";
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
let allPeople = [];

async function fetchPeople() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allPeople = data.results;
    displayPeople(allPeople); 
  } catch (error) {
    console.error("Hiba az adatok lekérésekor:", error);
  }
}

function displayPeople(people) {
  resultsDiv.innerHTML = ""; 
  people.forEach(person => {
    const personCard = document.createElement("div");
    personCard.classList.add("person-card");

    const photo = person.picture.large;
    personCard.innerHTML = `
      <img src="${photo}" alt="${person.name.first} ${person.name.last}" />
      <div class="info">
        <h3>${person.name.title} ${person.name.first} ${person.name.last}</h3>
        <p><strong>Születési hely:</strong> ${person.location.city}, ${person.location.country}</p>
        <p><strong>ID:</strong> ${person.login.uuid}</p>
        <p><strong>Email:</strong> ${person.email}</p>
      </div>
    `;
    resultsDiv.appendChild(personCard);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const filteredPeople = allPeople.filter(person =>
    person.name.first.toLowerCase().includes(query) ||
    person.name.last.toLowerCase().includes(query) ||
    person.location.city.toLowerCase().includes(query) ||
    person.location.country.toLowerCase().includes(query) ||
    person.login.uuid.toLowerCase().includes(query)
  );
  displayPeople(filteredPeople); 
});

fetchPeople();
