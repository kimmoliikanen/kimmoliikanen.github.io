document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "665ecd56dfc08dbb50feb8b8f5034e28";
    const kaupungit = ["Helsinki", "Tampere", "Singapore"];
    const tableBody = document.querySelector("saa-table tbody");

    tableBody.innerHTML = "<tr>td colspan='4'>Ladataan säätietoja...</td></tr>";

    //Haetaan säätiedot kaikille kaupungeille
    Promise.all(kaupungit.map(kaupunki => haeSaa(kaupunki, apiKey)))
    .then(saatiedot => {
        tableBody.innerHTML = saatiedot.join("");
    })
    .catch(error => {
        console.error("Virhe säätietojen haussa:", error);
        tableBody.innerHTML = "<tr><td colspan='4' style='color:red;'>Tietoja ei voitu hakea.</td></tr>";
    });
});

function haeSaa(kaupunki, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kaupunki}&appid=${apiKey}&units=metric&lang=fi`;

    return fetch (url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Verkkovirhe! Säätietoja ei voitu hakea.");
            }
            return response.json();
        })
        .then(data => {
            return `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.weather[0].description}</td>
                    <td>${data.main.temp}°C</td>
                    <td>${data.wind.speed} m/s</>
                </tr>
            `;

        });
}