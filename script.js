const userLocation = document.getElementById("userLocation"),
  converter = document.getElementById("converter"),
  weatherIcon = document.querySelector(".weatherIcon"),
  temperature = document.querySelector(".temperature"),
  feelslike = document.querySelector(".feelslike"),
  description = document.querySelector(".description"),
  dateTime = document.querySelector(".datetime"),
  city = document.querySelector(".city"),
  HValue = document.getElementById("HValue"),
  WValue = document.getElementById("WValue"),
  SRValue = document.getElementById("SRValue"),
  SSValue = document.getElementById("SSValue"),
  CValue = document.getElementById("CValue"),
  UVValue = document.getElementById("UVValue"),
  PValue = document.getElementById("PValue"),
  themeToggle = document.getElementById("themeToggle");

const API_KEY = '75dee5c87367f7d46375eb082ce67fdb'; // Replace with your Weatherstack API key

function findUserLocation() {
  const location = userLocation.value.trim();
  if (!location) return alert("Please enter a city name!");

  const unit = converter.value === "°C" ? "m" : "f";
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}&units=${unit}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.success === false || !data.current) return alert("City not found.");

      const icon = data.current.weather_icons[0];
      const condition = data.current.weather_descriptions[0];

      weatherIcon.innerHTML = `<img src="${icon}" alt="Weather Icon" />`;
      temperature.innerText = `${data.current.temperature} ${converter.value}`;
      feelslike.innerText = `Feels like: ${data.current.feelslike} ${converter.value}`;
      description.innerText = condition;
      updateBackground(condition);

      const localTime = new Date(data.location.localtime);
      const options = { month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit' };
      const formattedDateTime = localTime.toLocaleString('en-US', options);
      dateTime.innerText = `🕓 ${formattedDateTime}`;

      city.innerText = `${data.location.name}, ${data.location.country}`;
      HValue.innerText = `${data.current.humidity} %`;
      WValue.innerText = `${data.current.wind_speed} km/h`;
      CValue.innerText = `${data.current.cloudcover} %`;
      UVValue.innerText = `${data.current.uv_index || 'N/A'}`;
      PValue.innerText = `${data.current.pressure} mb`;

      SRValue.innerText = "--:--"; // Not available in free API
      SSValue.innerText = "--:--"; // Not available in free API
    })
    .catch(error => {
      console.error("Fetch error:", error);
      alert("Something went wrong.");
    });
}

function updateBackground(condition) {
  const lower = condition.toLowerCase();
  if (lower.includes("sunny") || lower.includes("clear")) {
    document.body.style.background = "linear-gradient(to right, #f9d423, #ff4e50)";
  } else if (lower.includes("cloud")) {
    document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
  } else if (lower.includes("rain") || lower.includes("drizzle")) {
    document.body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
  } else if (lower.includes("snow")) {
    document.body.style.background = "linear-gradient(to right, #e6dada, #274046)";
  } else if (lower.includes("storm") || lower.includes("thunder")) {
    document.body.style.background = "linear-gradient(to right, #373B44, #4286f4)";
  } else {
    document.body.style.background = "linear-gradient(to right, #a1c4fd, #c2e9fb)";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });
}