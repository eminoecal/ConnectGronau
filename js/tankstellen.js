const API_KEY = "de824513-42dd-3a3b-a88f-4a6bfdbfde80"; // Tankerkönig API-Key
const POSTLEITZAHL = "48599"; // PLZ

async function fetchTankstellen() {
  try {
    const response = await fetch(
      `https://creativecommons.tankerkoenig.de/json/list.php?lat=52.2111&lng=7.0227&rad=5&sort=price&type=e5&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Tankstellen-Daten.");
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("Fehler in der API-Antwort. API überprüfen.");
    }

    renderTankstellen(data.stations);
  } catch (error) {
    console.error("Error fetching data:", error);
    const container = document.getElementById("tankstellen-container");
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger">Tankstellen-Daten konnten nicht geladen werden.</div>
      </div>
    `;
  }
}

function renderTankstellen(stations) {
  const container = document.getElementById("tankstellen-container");
  container.innerHTML = ""; // Container leeren

  stations.forEach((station) => {
    const card = document.createElement("div");
    card.className = "col-md-4 col-sm-6";
    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <i class="bi bi-fuel-pump icon"></i>${station.name}
          </h5>
          <p class="card-text"><i class="bi bi-geo-alt icon"></i>${station.street} ${station.houseNumber}, ${station.place}</p>
          <p class="price">Super E5: ${station.e5 ? station.e5.toFixed(2) + " €/L" : "Keine Preise gefunden"}</p>
          <p class="price">Super E10: ${station.e10 ? station.e10.toFixed(2) + " €/L" : "Keine Preise gefunden."}</p>
          <p class="price">Diesel: ${station.diesel ? station.diesel.toFixed(2) + " €/L" : "N/A"}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Startet die Datenabfrage beim Laden der Seite
document.addEventListener("DOMContentLoaded", fetchTankstellen);
