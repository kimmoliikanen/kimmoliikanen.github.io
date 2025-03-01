document.addEventListener("DOMContentLoaded", () => {
    const url = "https://api.visittampere.com/api/v1/visittampere/event/published/all/?format=json&lang=fi";

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Verkkovirhe! Tapahtumia ei voitu hakea.");
        }
        return response.json();
    })
    .then(data => {
        tapahtumat(data);
    })
    .catch(error => {
        console.error("Virhe haettaessa dataa:", error);
        document.getElementById("vastaus").innerHTML = `<p style="color: red;">Tietoa ei pystytä hakemaan.</p>`;
    });
});



function tapahtumat(data) {
    let teksti = "<h1>Tampereella tapahtuu</h1>";

    for (let i = 0; i < data.length; i++) {
        let nimi = data[i].title ? data[i].title: "Ei nimeä saatavilla";
        let kuvaus = data[i].description ? data[i].description: "Ei kuvausta saatavilla";
        let url = data[i].url ? data[i].url: "#";

        teksti += `<h3>${nimi}</h3>`;
        teksti += `<p>${kuvaus}</p>`;
        teksti += `<p><a href="${url}" target="_blank">${url}</a></p>`;
    }

    document.getElementById("vastaus").innerHTML = teksti;
}
